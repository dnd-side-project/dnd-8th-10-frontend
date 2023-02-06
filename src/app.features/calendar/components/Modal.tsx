import React, { useEffect, useState } from 'react';
import SetTimeButtons from 'src/app.components/SetTimeButtons';
import useRegisterUserStore from 'src/app.features/register/store';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import useStore from '../store';
import { ISchedule } from '../types';
type Flag = 'startTime' | 'endTime' | null;
function Modal() {
	// 더미 스케쥴
	const [schedule, _Setschedule] = useState<ISchedule>({
		박수빈: {
			일: '오전 8시~오후 3시',
			목: '오후 2시~오후 12시',
		},
	});

	// api출근 시간 리스트 받고 본인이 있으면 openModalGroup true로 바꿔 리스트 보여줌
	// 없으면 시간수정이 가능한 출근하기 버튼

	// 더미 그룹 스케쥴
	const [scheduleGroup, _setScheduleGroup] = useState<{ [key: string]: { [key: string]: string } }>({
		박수빈: {
			일: '오전 8시~오후 3시',
		},
		정예원: {
			일: '오후 12시~오후 4시',
		},
	});

	const { isDay, workDay } = useStore();
	const {
		user: { startTime, endTime },
		setTime,
	} = useRegisterUserStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const [openModalGroup, setOpenModalGroup] = useState<boolean>(false);
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};

	// const listMatch = () => {
	// 	Object.keys(schedule).forEach((list) => {
	// 		Object.keys(scheduleGroup).forEach((user) => {
	// 			if (list === user) {
	// 				setOpenModalGroup(true);
	// 			}
	// 		});
	// 	});
	// };
	useEffect(() => {
		setOpenModalGroup(false);
		setOpenModalFlag(null);
		// listMatch();
	}, [isDay]);

	const time = () => {
		let arr: string = '';
		const objectData: any = schedule.박수빈;
		Object.keys(objectData).forEach((key) => {
			if (getDayOfWeek(isDay) === key) {
				arr = objectData[key];
			}
		});
		return arr;
	};

	return (
		<div className="z-10  bg-[#F8F8F8] w-screen  absolute bottom-0 flex-col items-center justify-center">
			<div className="flex justify-center mt-3">
				<div className="w-[55px] h-[4px] bg-[#D9D9D9] rounded-lg"></div>
			</div>
			{!openModalGroup ? (
				<div className="px-[20px] py-[40px]">
					<div className="flex">
						<div className="w-[50%] font-semibold">시작</div>
						<div className="w-[50%] font-semibold">종료</div>
					</div>
					<div className="flex items-center my-3">
						<div
							className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg"
							onClick={() => setOpenModalFlag('startTime')}
						>
							{workDay
								? !openModalFlag
									? time().split('~')[1]
									: `${startTime.meridiem} ${startTime.hour}시 ${startTime.minute}분`
								: `${startTime.meridiem} ${startTime.hour}시 ${startTime.minute}분`}
						</div>
						<span className="mx-[10px]">~</span>
						<div
							className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg"
							onClick={() => setOpenModalFlag('endTime')}
						>
							{workDay
								? !openModalFlag
									? time().split('~')[1]
									: `${endTime.meridiem} ${endTime.hour}시 ${endTime.minute}분`
								: `${endTime.meridiem} ${endTime.hour}시 ${endTime.minute}분`}
						</div>
					</div>
					{openModalFlag !== null && (
						<div>
							<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
						</div>
					)}
					<div className="mt-5 mb-7">
						<button
							className="bg-[#D9D9D9] w-full py-[20px] font-semibold rounded-lg"
							onClick={() => setOpenModalGroup(true)}
						>
							출근하기
						</button>
					</div>
				</div>
			) : (
				// 유저들의 출근 시간 리스트 api 받아오고 뿌려주는 곳
				<div className="px-[20px] py-[40px]">
					<div className="flex justify-between">
						<div>
							{isDay} {getDayOfWeek(isDay)}
						</div>
						<div>출근수정</div>
					</div>
					<div>
						{Object.entries(scheduleGroup)
							.map(([name, schedule]) => ({ name, schedule }))
							.map(({ name, schedule }: { name: string; schedule: { [key: string]: string } }) => (
								<div key={name}>
									{name}: {schedule[getDayOfWeek(isDay)]}
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Modal;
