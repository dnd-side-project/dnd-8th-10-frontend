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
	const [status, setStatus] = useState<boolean>(false);
	// 출근하기 버튼
	const commute = () => {
		if (todayWork && !status) {
			const [start, end] = todayWork.split('~');
			const startSplit = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
			const endSplit = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
			const timeDiff = Math.abs((startSplit - endSplit) / 60);
			WorkMutate({ year, month, day, workTime: todayWork, workHour: timeDiff });
		} else {
			alert('근무날이 아닙니다.');
			// 금일이 근무날 아님
			// modalCalData(toDay, status);
			// router.push(`${SERVICE_URL.calendarModify}`);
		}
	};
	useEffect(() => {
		if (grayData) {
			setStatus(grayData.includes(Number(day)));
		}
	}, [grayData]);
	return (
		<div
			role="presentation"
			onClick={() => commute()}
			className={`${
				status ? 'bg-primary' : 'bg-w'
			} cursor-pointer h-[11.3rem] my-[1.6rem] px-[2rem] py[1.6rem] flex justify-between items-center rounded-[0.8rem] shadow-gray`}
		>
			<div className="h-[7.4rem] flex flex-col justify-between">
				<div>
					<span className={`text-title2 ${status ? 'text-w' : 'text-g9'}`}>{status ? '근무중...' : '출근하기'}</span>
				</div>
				<div>
					<span className={`text-subhead1 ${status ? 'text-g2' : 'text-g6'}`}>
						{month}월 {day}일 {status ? '근무중' : '근무 시작하기'}
					</span>
				</div>
			</div>
			{status ? <WorkingIcon /> : <WorkIcon />}
		</div>
	);
}

export default WorkStatus;
