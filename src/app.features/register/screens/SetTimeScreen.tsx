import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import DayButton from 'src/app.features/register/components/DayButton';
import OpenSetTimeModalButtons from 'src/app.components/Button/OpenSetTimeModalButtons';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import { mappedDay, DayType, TimeType } from 'src/app.modules/types/workTime';
import TopModal from 'src/app.components/Modal/TopModal';
import Overlay from 'src/app.components/Modal/Overlay';
import useModalStore from 'src/app.modules/store/modal';
import Bar from 'src/app.components/app.base/Button/Bar';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore, { INIT_WORKTIME } from '../store';

// TODO: 시간 유효성체크 (끝나는 시간이 시작하는 시간보다 빠른지)
// TODO: 오전 0시 24시로 표기
type Flag = TimeType | null;
type WorkTimeOnModalType = {
	meridiem: 'am' | 'pm';
	hour: string;
	minute: string;
};
function SetTimeScreen() {
	const [selectedDay, setSelectedDay] = useState<DayType>();
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
		if (!selectedDay) return;
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
		if (!selectedDay) return;
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
		if (!selectedDay) return;
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
				<h1 className="text-g10 text-title2">일하는 요일별 근무시간을 알려주세요</h1>
				<div className="flex flex-col space-y-[3.2rem]">
					<div className="space-y-[0.8rem] w-full">
						<h2 className="text-g6 text-body2">근무요일(복수선택 가능)</h2>
						<ul className="grid  grid-cols-7  ">
							{/* TODO: 간격 화면 크기별로 대응 */}
							{['6', '0', '1', '2', '3', '4', '5'].map((item, index) => (
								<li key={index} className="mx-auto">
									<DayButton
										name="day"
										value={item}
										item={mappedDay[item as DayType]}
										onClick={selectedDayHandler}
										state={selectedDay === item ? 'focus' : `${workTime[item as DayType] ? 'selected' : 'default'}`}
									/>
								</li>
							))}
						</ul>
					</div>
					{selectedDay && (
						<div className="space-y-[0.8rem]">
							<h2 className="text-g6 text-body2">근무 시간</h2>
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
								day={selectedDay}
								mode="dark"
							/>
						</div>
					)}
				</div>
			</div>
			{isModalOpen && (
				<Overlay>
					<TopModal>
						<div className="space-y-[2.4rem] flex flex-col items-center">
							<span className="text-g10 text-subhead3">
								언제 {openModalFlag === 'startTime' ? '출근' : '퇴근'}하시나요?
							</span>
							<SetTimeButtons timeHandler={timeOnModalHandler} time={workTimeOnModal} mode="dark" />

							<Bar ClickFn={workTimeHandler}>완료</Bar>
						</div>
					</TopModal>
				</Overlay>
			)}
		</RegisterLayout>
	);
}

export default SetTimeScreen;

/*

<div>
						
					</div>


*/
