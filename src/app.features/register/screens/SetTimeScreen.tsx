import React, { BaseSyntheticEvent, useState } from 'react';
import DayButton from 'src/app.features/register/components/DayButton';
import OpenSetTimeModalButtons from 'src/app.components/Button/OpenSetTimeModalButtons';
import { mappedDay, DayType, TimeType, WorkTimeType } from 'src/app.modules/types/workTime';
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
		userForm: { workTimeObj },
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
	const [isAlertPop, setIsAlertPop] = useState<boolean>(false);
	const workTimeHandler = () => {
		const { meridiem, hour, minute } = workTimeOnModal;
		if (!meridiem || !hour || !minute) return;
		if (!selectedDay) return;
		const updatedWorkTime = {
			...(workTimeObj ?? {}),
			[selectedDay]: {
				...workTimeObj?.[selectedDay],
				[openModalFlag as TimeType]: {
					...workTimeOnModal,
				},
			},
		} as WorkTimeType;

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
		const temp = { ...workTimeObj?.[selectedDay] };
		delete temp[flag];
		const updatedWorkTime = {
			...workTimeObj,
			[selectedDay]: {
				...temp,
			},
		} as WorkTimeType;
		setTime(updatedWorkTime);
	};
	const openSetTimeModalHandler = (flag: TimeType) => {
		if (!selectedDay) return;
		setOpenModalFlag(flag);
		openModal();
		setIsAlertPop(false);
		const newWorkTimeOnModal = workTimeObj?.[selectedDay]?.[flag as TimeType] ?? INIT_WORK_TIME;
		setWorkTimeOnModal(newWorkTimeOnModal);
	};

	return (
		<RegisterLayout curPage={3} canGoNext={Boolean(workTimeObj)} guideMessage="일하는 요일별 근무시간을 알려주세요">
			{/* TODO: 다음으로 넘어가는 조건 다시 지정 (더 자세하게) */}
			<div className=" space-y-[3.2rem] mt-[2.4rem] ">
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
										onClick={(e) => {
											// 하나만 입력되어 있으면
											if (
												selectedDay !== undefined &&
												workTimeObj?.[selectedDay] &&
												Object.keys(workTimeObj?.[selectedDay]).length === 1
											) {
												console.log(workTimeObj?.[selectedDay]);
												setIsAlertPop(true);
												return;
											}
											selectedDayHandler(e);
										}}
										state={
											selectedDay === item ? 'focus' : `${workTimeObj?.[item as DayType] ? 'selected' : 'default'}`
										}
									/>
								</li>
							))}
						</ul>
					</div>
					{selectedDay && (
						<div className="space-y-[0.8rem]">
							<h2 className="text-g6 text-body2">근무 시간</h2>
							<div>
								<OpenSetTimeModalButtons
									openSetTimeModalHandler={openSetTimeModalHandler}
									isStartTimeSet={Boolean(workTimeObj?.[selectedDay]?.startTime)}
									isEndTimeSet={Boolean(workTimeObj?.[selectedDay]?.endTime)}
									startTimeText={`${workTimeObj?.[selectedDay]?.startTime?.meridiem === 'am' ? '오전' : '오후'} ${
										workTimeObj?.[selectedDay]?.startTime?.hour
									} : ${Number(workTimeObj?.[selectedDay]?.startTime?.minute) < 10 ? '0' : ''}${
										workTimeObj?.[selectedDay]?.startTime?.minute
									}`}
									endTimeText={`${workTimeObj?.[selectedDay]?.endTime?.meridiem === 'am' ? '오전' : '오후'} ${
										workTimeObj?.[selectedDay]?.endTime?.hour
									} : ${Number(workTimeObj?.[selectedDay]?.endTime?.minute) < 10 ? '0' : ''}${
										workTimeObj?.[selectedDay]?.endTime?.minute
									}`}
									resetTimeHandler={resetTimeHandler}
									focusedType={openModalFlag}
									day={selectedDay}
									isAlertPop={isAlertPop}
								/>
								{isAlertPop && (
									<span className="text-secondary text-[1rem] leading-[1.8rem] -tracking-[0.06rem] ">
										출근과 퇴근시간을 모두 입력해주세요.
									</span>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			{isModalOpen && (
				<SetWorkTimeModal
					closeModal={() => {
						setOpenModalFlag(null);
						closeAnimationModal();
					}}
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
