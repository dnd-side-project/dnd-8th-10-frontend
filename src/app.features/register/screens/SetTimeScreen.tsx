import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import DayButton from 'src/app.features/register/components/DayButton';
import OpenSetTimeModalButtons from 'src/app.components/Button/OpenSetTimeModalButtons';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import { TimeType } from 'src/app.modules/types/time';
import TopModal from 'src/app.components/Modal/TopModal';
import Overlay from 'src/app.components/Modal/Overlay';
import useModalStore from 'src/app.modules/store/modal';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore, { dayMap, DayType, INIT_WORKTIME } from '../store';

// TODO: 시간 유효성체크 (끝나는 시간이 시작하는 시간보다 빠른지)
// TODO: 오전 0시 24시로 표기
type Flag = TimeType | null;
type WorkTimeOnModalType = {
	meridiem: 'am' | 'pm';
	hour: string;
	minute: string;
};
function SetTimeScreen() {
	const [selectedDay, setSelectedDay] = useState<DayType>('6');
	const {
		user: { workTime },
		setTime,
	} = useRegisterUserStore();

	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const INIT_WORK_TIME = {
		meridiem: 'am',
		hour: '1',
		minute: '0',
	} as WorkTimeOnModalType;
	const [workTimeOnModal, setWorkTimeOnModal] = useState<WorkTimeOnModalType>(INIT_WORK_TIME);
	const timeOnModalHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setWorkTimeOnModal({
			...workTimeOnModal,
			[name]: value,
		});
	};
	const workTimeHandler = () => {
		const { meridiem, hour, minute } = workTimeOnModal;
		if (!meridiem || !hour || !minute) return;
		const updatedWorkTime = {
			...workTime,
			[selectedDay]: {
				...workTime[selectedDay],
				[openModalFlag as TimeType]: {
					...workTimeOnModal,
				},
			},
		};

		setTime(updatedWorkTime);
		setOpenModalFlag(null);
		setWorkTimeOnModal(INIT_WORK_TIME);
		modalIsClose();
	};
	const selectedDayHandler = (e: BaseSyntheticEvent) => {
		setSelectedDay(e.target.value);
	};
	const resetTimeHandler = (flag: TimeType) => {
		const temp = { ...workTime[selectedDay] };
		delete temp[flag];
		const updatedWorkTime = {
			...workTime,
			[selectedDay]: {
				...temp,
			},
		};
		setTime(updatedWorkTime);
	};
	const openSetTimeModalHandler = (flag: TimeType) => {
		setOpenModalFlag(flag);
		modalIsOpen();
		const newWorkTimeOnModal = workTime?.[selectedDay]?.[flag as TimeType];
		if (!newWorkTimeOnModal) return;
		setWorkTimeOnModal(newWorkTimeOnModal);
	};

	return (
		<RegisterLayout curPage={3} canGoNext={Boolean(workTime !== INIT_WORKTIME)}>
			{/* TODO: 다음으로 넘어가는 조건 다시 지정 (더 자세하게) */}
			<div className="space-y-[3.2rem] ">
				<h1 className="text-g10 text-title2">근무하는 시간대를 설정해주세요</h1>
				<div className="flex flex-col space-y-[3.2rem]">
					<div className="space-y-[0.8rem] w-full">
						<h2 className="text-g6 text-subhead1">요일 선택</h2>
						<ul className="grid  grid-cols-7  ">
							{/* TODO: 간격 화면 크기별로 대응 */}
							{['6', '0', '1', '2', '3', '4', '5'].map((day, index) => (
								<li key={index} className="mx-auto">
									<DayButton
										name="day"
										value={day}
										item={dayMap.get(day) as string}
										onClick={selectedDayHandler}
										state={selectedDay === day ? 'focus' : `${workTime[day as DayType] ? 'selected' : 'default'}`}
									/>
								</li>
							))}
						</ul>
					</div>
					<div className="space-y-[0.8rem]">
						<h2 className="text-g6 text-subhead1">시간 선택</h2>
						<OpenSetTimeModalButtons
							openSetTimeModalHandler={openSetTimeModalHandler}
							isStartTimeSet={Boolean(workTime[selectedDay]?.startTime)}
							isEndTimeSet={Boolean(workTime[selectedDay]?.endTime)}
							startTimeText={`${workTime[selectedDay]?.startTime?.meridiem === 'am' ? '오전' : '오후'} ${
								workTime[selectedDay]?.startTime?.hour
							}시 ${workTime[selectedDay]?.startTime?.minute}분`}
							endTimeText={`${workTime[selectedDay]?.endTime?.meridiem === 'am' ? '오전' : '오후'} ${
								workTime[selectedDay]?.endTime?.hour
							}시 ${workTime[selectedDay]?.endTime?.minute}분`}
							resetTimeHandler={resetTimeHandler}
						/>
					</div>
				</div>
			</div>
			{isModalOpen && (
				<>
					<Overlay />
					<TopModal>
						<div>
							<SetTimeButtons timeHandler={timeOnModalHandler} time={workTimeOnModal} />
							<button onClick={workTimeHandler}>완료</button>
						</div>
					</TopModal>
				</>
			)}
		</RegisterLayout>
	);
}

export default SetTimeScreen;

/*

<div>
						
					</div>


*/
