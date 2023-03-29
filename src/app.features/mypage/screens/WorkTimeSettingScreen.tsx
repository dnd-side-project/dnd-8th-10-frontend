import React, { useEffect, useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import OpenSetTimeModalButtons from 'src/app.components/Button/OpenSetTimeModalButtons';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import Header from 'src/app.components/Header';
import Overlay from 'src/app.components/Modal/Overlay';
import TopModal from 'src/app.components/Modal/TopModal';
import DayButton from 'src/app.features/register/components/DayButton';
import { MutateTpye } from 'src/app.modules/api/client';
import { mappedDay, dayMapReverse, DayType, TimeType, WorkTimeType } from 'src/app.modules/types/workTime';
import { getUserWeekWorkTimeString } from 'src/app.modules/util/getWorkTimeString';
import DeleteIcon from 'src/app.modules/assets/delete.svg';
import useModal from 'src/app.modules/hooks/useModal';
import Modal from 'src/app.components/Modal/Modal';
import { MutateUserBodyType } from 'src/app.modules/api/user';
import { IUser } from 'src/app.modules/types/user';
import SetWorkTimeModal from '../../../app.components/Modal/SetWorkTimeModal';

// TODO: register랑 겹치는 부분 컴포넌트화
// TODO: 설정한 시간이 유효한 값인지 확인
interface Props {
	user: IUser;
	putUser: MutateTpye<MutateUserBodyType>;
	isLoading: boolean;
}
export type WorkTimeOnModalType = {
	meridiem: 'am' | 'pm' | null;
	hour: string | null;
	minute: string | null;
};
type Flag = TimeType | null;
function WorkTimeSettingScreen({ user, putUser, isLoading }: Props) {
	const [selectedDay, setSelectedDay] = useState<DayType>();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const { isModalOpen, openModal, closeModal, closeAnimationModal } = useModal();
	const { isModalOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
	const [workTime, setWorkTime] = useState<WorkTimeType | null>(null);
	const INIT_WORK_TIME = {
		meridiem: null,
		hour: null,
		minute: null,
	} as WorkTimeOnModalType;
	const [workTimeOnModal, setWorkTimeOnModal] = useState<WorkTimeOnModalType>(INIT_WORK_TIME);
	const [isAlertPop, setIsAlertPop] = useState<boolean>(false);
	const selectedDayHandler = (e: React.BaseSyntheticEvent) => {
		if (openModalFlag != null) {
			setOpenModalFlag(null);
		}
		setSelectedDay(e.target.value);
	};

	const openSetTimeModalHandler = (flag: TimeType) => {
		if (!selectedDay) return;
		setOpenModalFlag(flag);
		openModal();
		setIsAlertPop(false);
		const newWorkTimeOnModal = workTime?.[selectedDay]?.[flag as TimeType] ?? INIT_WORK_TIME;
		setWorkTimeOnModal(newWorkTimeOnModal);
	};
	const resetTimeHandler = (flag: TimeType) => {
		if (workTime === null) return;
		if (!selectedDay) return;
		const temp = { ...workTime[selectedDay] };
		delete temp[flag];
		const updatedWorkTime = {
			...workTime,
			[selectedDay]: {
				...temp,
			},
		};
		setWorkTime(updatedWorkTime);
	};
	const submitHandler = () => {
		if (isLoading) return;
		if (!workTime) return;
		const body = {
			...user,
			workTime: getUserWeekWorkTimeString(workTime),
		};

		putUser(body);
	};
	const workTimeHandler = () => {
		const { meridiem, hour, minute } = workTimeOnModal;
		if (!meridiem || !hour || !minute) return;
		if (!selectedDay) return;
		const updatedWorkTime = {
			...(workTime ?? ({} as WorkTimeType)),
			[selectedDay]: {
				...workTime?.[selectedDay],
				[openModalFlag as TimeType]: {
					...workTimeOnModal,
				},
			},
		};
		setOpenModalFlag(null);
		setWorkTimeOnModal(INIT_WORK_TIME);
		setWorkTime(updatedWorkTime);
	};

	const timeOnModalHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setWorkTimeOnModal({
			...workTimeOnModal,
			[name]: value,
		});
	};
	useEffect(() => {
		if (!user) return;
		const tmp = user.workTime.split(',').map((item) => [
			dayMapReverse.get(item[0]),
			{
				startTime: {
					meridiem:
						+item.split('~')[0].slice(2).split(':')[0] < 12 || +item.split('~')[0].slice(2).split(':')[0] === 24
							? 'am'
							: 'pm',
					hour: `${+item.split('~')[0].slice(2).split(':')[0] % 12}`,
					minute: `${+item.split('~')[0].slice(2).split(':')[1]}`,
				},
				endTime: {
					meridiem: +item.split('~')[1].split(':')[0] < 12 || +item.split('~')[1].split(':')[0] === 24 ? 'am' : 'pm',
					hour: `${+item.split('~')[1].split(':')[0] % 12}`,
					minute: `${+item.split('~')[1].split(':')[1].slice(0, 2)}`,
				},
			},
		]);
		setWorkTime(Object.fromEntries(tmp));
	}, [user]);

	return (
		<>
			<Header title="근무시간 수정">
				<button onClick={openDeleteModal}>
					<DeleteIcon />
				</button>
			</Header>
			<main className="h-full pt-[7.2rem] relative">
				<div className="flex flex-col space-y-[3.2rem]">
					<div className="space-y-[0.8rem] w-full">
						<h2 className="text-g6 text-subhead1">근무요일 (복수선택 가능) </h2>
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
												workTime?.[selectedDay] &&
												Object.keys(workTime?.[selectedDay]).length === 1
											) {
												console.log(workTime?.[selectedDay]);
												setIsAlertPop(true);
												return;
											}
											selectedDayHandler(e);
										}}
										state={selectedDay === item ? 'focus' : `${workTime?.[item as DayType] ? 'selected' : 'default'}`}
									/>
								</li>
							))}
						</ul>
					</div>
					{selectedDay && (
						<div className="space-y-[0.8rem]">
							<h2 className="text-g6 text-subhead1">시간 선택</h2>
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
								day={selectedDay}
								isAlertPop={isAlertPop}
							/>
							{isAlertPop && (
								<span className="text-secondary text-[1rem] leading-[1.8rem] -tracking-[0.06rem] ">
									출근과 퇴근시간을 모두 입력해주세요.
								</span>
							)}
						</div>
					)}
				</div>
				<div className="absolute bottom-[2rem] w-full">
					<Bar disabled={workTime === null} ClickFn={submitHandler}>
						수정
					</Bar>
				</div>
			</main>
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
			{isDeleteModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeDeleteModal();
					}}
				>
					<Modal
						title="전체 근무시간을 삭제할까요?"
						yesFn={() => {
							setWorkTime(null);
							closeDeleteModal();
						}}
						yesTitle="삭제"
						noFn={closeDeleteModal}
						noTitle="아니오"
					/>
				</Overlay>
			)}
		</>
	);
}

export default WorkTimeSettingScreen;
