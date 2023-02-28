import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getWorkList, MutateBody } from 'src/app.features/calendar/api';
import useStore from 'src/app.features/calendar/store';
import { MutateTpye } from 'src/app.modules/api/client';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { homeTimeView, timeSplit } from 'src/app.modules/util/calendar';
import WorkIcon from '../../../../public/images/home/work.svg';
import WorkingIcon from '../../../../public/images/home/working.svg';

interface Props {
	grayData: number[];
	WorkMutate: MutateTpye<MutateBody>;
	todayWork: string;
	userName: string;
}

function WorkStatus({ grayData, WorkMutate, todayWork, userName }: Props) {
	const router = useRouter();
	const { toDay, modalCalData } = useStore();
	const [year, month, day] = toDay.split('.');
	const [workStatus, setWorkStatus] = useState<boolean>(false);
	const [workTime, setWorkTime] = useState<string[]>([]);

	// 출근하기 버튼
	const commute = async () => {
		if (todayWork && !workStatus) {
			const [startSplit, endSplit] = timeSplit(workTime);
			const timeDiff = Math.abs((startSplit - endSplit) / 60);
			WorkMutate({ year, month, day, workTime: todayWork, workHour: timeDiff });
		} else if (todayWork && workStatus) {
			// alert('출근완료');
		} else if (!workStatus) {
			// alert('근무날이 아닙니다.');
			modalCalData(toDay, workStatus);
			router.push(`${SERVICE_URL.calendarRecord}/${'commute'}?title=${'add'}`);
		}
	};

	const redundantWork = () => {
		const data = getWorkList({ year, month, day });
		data.then((res) => {
			const userWorkTime = res.data.data.filter((val: { name: string }) => val.name === userName);
			if (userWorkTime.length > 0) {
				const userWorkTimeRecent = userWorkTime.sort((a: { timeCardId: number }, b: { timeCardId: number }) => {
					return Number(b.timeCardId) - Number(a.timeCardId);
				});
				setWorkTime(userWorkTimeRecent[0].workTime.split('~'));
			}
		});
	};

	useEffect(() => {
		if (grayData) {
			// 오늘 출근했는지 확인
			setWorkStatus(grayData.includes(Number(day)));
		}
		if (todayWork) {
			// 오늘 일하는 날인지 확인
			setWorkTime(todayWork.split('~'));
			// 중복 출근시
			redundantWork();
		} else {
			// 일하는 날이 아니면 출근했는지 기록만 확인
			const data = getWorkList({ year, month, day });
			redundantWork();
		}
	}, [grayData, todayWork, userName]);

	return (
		<div
			role="presentation"
			onClick={() => commute()}
			className={`${
				workStatus ? 'bg-primary' : 'bg-w'
			} cursor-pointer h-[11.3rem] my-[1.6rem] p-[2rem] flex justify-between items-center rounded-[0.8rem] shadow-gray`}
		>
			<div className="h-[7.3rem] flex flex-col justify-between">
				<div>
					{todayWork || workStatus ? (
						<span className={`text-title2 ${workStatus ? 'text-w' : 'text-g9'}`}>
							{workStatus ? '출근완료' : '출근하기'}
						</span>
					) : (
						workTime.length === 0 && (
							<div className="text-g9 text-subhead2">
								<span>근무시간이 아니에요</span> <br />
								<span>출근하시겠어요?</span>
							</div>
						)
					)}
				</div>
				<div>
					<span className={`text-subhead1 ${workStatus ? 'text-g2' : 'text-g7'}`}>
						{`${month}월 ${day}일  ${workTime.length > 0 ? homeTimeView(workTime[0]) : ''} `}
					</span>
				</div>
			</div>
			{workStatus ? <WorkingIcon /> : <WorkIcon />}
		</div>
	);
}

export default WorkStatus;
