import React, { BaseSyntheticEvent, useState } from 'react';
import DayButton from 'src/app.features/register/components/DayButton';
import OpenSetTimeModalButtons from 'src/app.components/Button/OpenSetTimeModalButtons';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import { mappedDay, DayType, TimeType } from 'src/app.modules/types/workTime';
import TopModal from 'src/app.components/Modal/TopModal';
import Overlay from 'src/app.components/Modal/Overlay';
import Bar from 'src/app.components/app.base/Button/Bar';
import useModal from 'src/app.modules/hooks/useModal';
import SetWorkTimeModal from 'src/app.components/Modal/SetWorkTimeModal';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore, { INIT_WORKTIME } from '../store';

// TODO: 시간 유효성체크 (끝나는 시간이 시작하는 시간보다 빠른지)
// TODO: 오전 0시 24시로 표기
type Flag = TimeType | null;

// TODO: 이름 바꾸기
export type WorkTimeOnModalType = {
	meridiem: 'am' | 'pm' | null;
	hour: string | null;
	minute: string | null;
};
function SetTimeScreen() {
	const [selectedDay, setSelectedDay] = useState<DayType>();
	const {
		user: { workTime },
		setTime,
	} = useRegisterUserStore();

	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const { isModalOpen, closeAnimationModal, closeModal, openModal } = useModal();
	const INIT_WORK_TIME = {
		meridiem: null,
		hour: null,
		minute: null,
	} as WorkTimeOnModalType;
	const [workTimeOnModal, setWorkTimeOnModal] = useState<WorkTimeOnModalType>(INIT_WORK_TIME);
	const timeOnModalHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;
		const newValue = workTimeOnModal[name as keyof WorkTimeOnModalType] !== value ? value : null;
		setWorkTimeOnModal({
			...workTimeOnModal,
			[name]: newValue,
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
	};
	const selectedDayHandler = (e: BaseSyntheticEvent) => {
		if (openModalFlag != null) {
			setOpenModalFlag(null);
		}
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
		openModal();
		const newWorkTimeOnModal = workTime?.[selectedDay]?.[flag as TimeType] ?? INIT_WORK_TIME;
		setWorkTimeOnModal(newWorkTimeOnModal);
	};

	return (
		<RegisterLayout
			curPage={3}
			canGoNext={Boolean(workTime !== INIT_WORKTIME)}
			guideMessage="일하는 요일별 근무시간을 알려주세요"
		>
			{/* TODO: 다음으로 넘어가는 조건 다시 지정 (더 자세하게) */}
			<div className="space-y-[3.2rem] pt-[2.4rem] ">
				<div className="flex flex-col space-y-[3.2rem]">
					<div className="space-y-[0.8rem] w-full">
						<h2 className="text-g6 text-body2">근무요일(복수선택 가능)</h2>
						<ul className="grid  grid-cols-7 max-w-[31rem] ml-[0.5rem] ">
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
								isStartTimeSet={Boolean(workTime?.[selectedDay]?.startTime)}
								isEndTimeSet={Boolean(workTime?.[selectedDay]?.endTime)}
								startTimeText={`${workTime?.[selectedDay]?.startTime?.meridiem === 'am' ? '오전' : '오후'} ${
									workTime?.[selectedDay]?.startTime?.hour
								} : ${Number(workTime?.[selectedDay]?.startTime?.minute) < 10 ? '0' : ''}${
									workTime?.[selectedDay]?.startTime?.minute
								}`}
								endTimeText={`${workTime?.[selectedDay]?.endTime?.meridiem === 'am' ? '오전' : '오후'} ${
									workTime?.[selectedDay]?.endTime?.hour
								} : ${Number(workTime?.[selectedDay]?.endTime?.minute) < 10 ? '0' : ''}${
									workTime?.[selectedDay]?.endTime?.minute
								}`}
								resetTimeHandler={resetTimeHandler}
								focusedType={openModalFlag}
							/>
						</div>
					)}
				</div>
			</div>
			{isModalOpen && (
				<SetWorkTimeModal
					closeModal={closeAnimationModal}
					onDone={workTimeHandler}
					time={workTimeOnModal}
					onTimeChange={timeOnModalHandler}
					openModalFlag={openModalFlag}
				/>
			)}
		</RegisterLayout>
	);
}

export default SetTimeScreen;
