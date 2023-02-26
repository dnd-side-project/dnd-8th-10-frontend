import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MutateBody } from 'src/app.features/calendar/api';
import useStore from 'src/app.features/calendar/store';
import { MutateTpye } from 'src/app.modules/api/client';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import WorkIcon from '../../../../public/images/home/work.svg';
import WorkingIcon from '../../../../public/images/home/working.svg';

interface Props {
	grayData: number[];
	WorkMutate: MutateTpye<MutateBody>;
	todayWork: string;
}
function WorkStatus({ grayData, WorkMutate, todayWork }: Props) {
	const router = useRouter();
	const { toDay, modalCalData } = useStore();
	const [year, month, day] = toDay.split('.');
	const [workStatus, setWorkStatus] = useState<boolean>(false);
	const [workTime, setWorkTime] = useState<string[]>([]);
	// 출근하기 버튼
	const commute = () => {
		if (todayWork && !workStatus) {
			const startSplit = Number(workTime[0].split(':')[0]) * 60 + Number(workTime[0].split(':')[1]);
			const endSplit = Number(workTime[1].split(':')[0]) * 60 + Number(workTime[1].split(':')[1]);
			const timeDiff = Math.abs((startSplit - endSplit) / 60);
			WorkMutate({ year, month, day, workTime: todayWork, workHour: timeDiff });
		} else if (todayWork && workStatus) {
			alert('출근완료');
		} else {
			alert('근무날이 아닙니다.');
			// modalCalData(toDay, workStatus);
			// router.push(`${SERVICE_URL.calendarModify}`);
		}
	};

	useEffect(() => {
		if (grayData) {
			setWorkStatus(grayData.includes(Number(day)));
		}
		if (todayWork) {
			setWorkTime(todayWork.split('~'));
		}
	}, [grayData, todayWork]);

	console.log(workTime);
	return (
		<div
			role="presentation"
			onClick={() => commute()}
			className={`${
				workStatus ? 'bg-primary' : 'bg-w'
			} cursor-pointer h-[11.3rem] my-[1.6rem] px-[2rem] py[1.6rem] flex justify-between items-center rounded-[0.8rem] shadow-gray`}
		>
			<div className="h-[7.4rem] flex flex-col justify-between">
				<div>
					{workTime.length > 0 ? (
						<span className={`text-title2 ${workStatus ? 'text-w' : 'text-g9'}`}>
							{workStatus ? '출근완료' : '출근하기'}
						</span>
					) : (
						<div className="text-g9 text-subhead1">
							<span>근무시간이 아니에요</span> <br />
							<span>출근하시겠어요?</span>
						</div>
					)}
				</div>
				<div>
					<span className={`text-subhead1 ${workStatus ? 'text-g2' : 'text-g7'}`}>
						{workTime.length > 0 ? `${month}월 ${day}일 ${workTime[0]} ~ ${workTime[1]}` : ''}
					</span>
				</div>
			</div>
			{workStatus ? <WorkingIcon /> : <WorkIcon />}
		</div>
	);
}

export default WorkStatus;
