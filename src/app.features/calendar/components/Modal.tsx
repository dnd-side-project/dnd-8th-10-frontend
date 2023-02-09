import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import { getToDay, getWorkList, MutateBody } from '../api';
import useStore from '../store';

interface Props {
	postWorkMutate: MutateTpye<MutateBody>;
}
//{ postWorkMutate }: Props
function Modal() {
	const { toDay, workDay, modalIsClose } = useStore();

	// api출근 시간 리스트 받고 본인이 있으면 openModalGroup true로 바꿔 리스트 보여줌
	// 없으면 시간수정이 가능한 출근하기 버튼

	const [workTime, setWorkTime] = useState<string>('');

	// 더미 그룹 스케쥴
	const [scheduleGroup, _setScheduleGroup] = useState({
		박수빈: '오전 11:00 ~ 오후 3:00',
		정예원: '오전 11:00 ~ 오후 3:30',
	});

	const { isDay } = useStore();
	const [openModalFlag, setOpenModalFlag] = useState(false);
	const [openModalGroup, setOpenModalGroup] = useState<boolean>(false);
	const [year, month, day] = isDay.split('.');

	// const calculateDuration = (start: string, end: string) => {
	// 	const startDate = new Date(`2023-02-09T${start}`);
	// 	const endDate = new Date(`2023-02-09T${end}`);
	// 	const difference = endDate - startDate;
	// 	const hours = difference / 1000 / 60 / 60;
	// 	return hours;
	// };

	// 출근하기 버튼
	const commute = () => {
		// calculateDuration(start, end);
		// postWorkMutate({
		// 	year,
		// 	month,
		// 	day,
		// 	time: '오전 11:00 ~ 오후 3:00',
		// 	workHour: 4.5,
		// });
		modalIsClose();
	};

	// 오늘 누른 경우
	if (isDay === toDay) {
		const data = getToDay(getDayOfWeek(isDay));
		data.then((res) => {
			if (res.data === '') {
				// 출근하는 날이 아님
				setWorkTime('오전 00:00 ~ 오후 00:00');
			} else {
				// 출근하는 날
				setWorkTime(res.data);
			}
		});
	}

	// 과거 누른 경우 & 출근한 날 누른 경우
	if (new Date(isDay) < new Date(toDay)) {
		// const data = getWorkList({
		// 	year,
		// 	month,
		// 	day,
		// });
	}
	const renderContent = () => {
		// 금일 클릭시
		if (!workDay && isDay === toDay) {
			// 출근하기
			return (
				<div className="px-[20px] py-[40px]">
					<div className="flex">
						<div className="w-[50%] font-semibold">시작</div>
						<div className="w-[50%] font-semibold">종료</div>
					</div>
					<div className="flex items-center my-3">
						<div className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg">{workTime.split('~')[0]}</div>
						<span className="mx-[10px]">~</span>
						<div className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg">{workTime.split('~')[1]}</div>
					</div>
					{openModalFlag !== null && (
						// 클릭한 날이 일하는 날이면 시간 받아온거 뿌리기
						// 클릭한 날이 일하는 날이 아니면 00시 00분
						<div>
							{/* <SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} /> */}
						</div>
					)}
					<div className="mt-5 mb-7">
						<button
							type="button"
							className="bg-[#D9D9D9] w-full py-[20px] font-semibold rounded-lg"
							onClick={() => commute()}
						>
							출근하기
						</button>
					</div>
				</div>
			);
		}

		if (!workDay || new Date(isDay) > new Date(toDay)) {
			// 근무 안된 날짜 클릭시, 미래 클릭시
			return (
				<div className="px-[20px] py-[40px]">
					<div className="flex justify-between">
						<div>{isDay}</div>
						<div>{new Date(isDay) < new Date(toDay) && '출근수정'}</div>
					</div>
					<div>아직 기록이 없어요.</div>
				</div>
			);
		}
		// 출근된 날짜 클릭시
		return (
			<div className="px-[20px] py-[40px]">
				<div className="flex justify-between">
					<div>{isDay}</div>
					<Link href={`${SERVICE_URL.calendarModify}`}>
						<div>출근수정</div>
					</Link>
				</div>
				<div>
					{Object.entries(scheduleGroup)
						.map(([user, schedule]) => ({ user, schedule }))
						.map(({ user, schedule }) => (
							<div key={user}>
								{user}: {schedule}
							</div>
						))}
				</div>
			</div>
		);
	};

	return (
		<div className="z-10  bg-[#F8F8F8] w-screen  absolute bottom-0 flex-col items-center justify-center">
			<div className="flex justify-center mt-3">
				<button type="button" onClick={() => modalIsClose()} className="w-[55px] h-[4px] bg-[#D9D9D9] rounded-lg">
					{' '}
				</button>
			</div>
			{renderContent()}
		</div>
	);
}

export default Modal;
