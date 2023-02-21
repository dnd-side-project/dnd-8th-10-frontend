import React, { useEffect, useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import OpenSetTimeModalButtons from 'src/app.components/Button/OpenSetTimeModalButtons';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import Header from 'src/app.components/Header';
import Overlay from 'src/app.components/Modal/Overlay';
import TopModal from 'src/app.components/Modal/TopModal';
import DayButton from 'src/app.features/register/components/DayButton';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBody } from 'src/app.modules/api/user';
import useModalStore from 'src/app.modules/store/modal';
import { dayMap, dayMapReverse, DayType, TimeType, WorkTimeType } from 'src/app.modules/types/workTime';
import { getWorkTimeString } from 'src/app.modules/util/getWorkTimeString';
import { IUser } from '../types';
// TODO: register랑 겹치는 부분 컴포넌트화
// TODO: 설정한 시간이 유효한 값인지 확인
interface Props {
	user: IUser;
	putUser: MutateTpye<MutateUserBody>;
	isLoading: boolean;
}
type WorkTimeOnModalType = {
	meridiem: 'am' | 'pm';
	hour: string;
	minute: string;
};
type Flag = TimeType | null;
function WorkTimeSettingScreen({ user, putUser, isLoading }: Props) {
	const [selectedDay, setSelectedDay] = useState<DayType>('6');
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const [workTime, setWorkTime] = useState<WorkTimeType>({} as WorkTimeType);
	const INIT_WORK_TIME = {
		meridiem: 'am',
		hour: '1',
		minute: '0',
	} as WorkTimeOnModalType;
	const [workTimeOnModal, setWorkTimeOnModal] = useState<WorkTimeOnModalType>(INIT_WORK_TIME);
	const selectedDayHandler = (e: React.BaseSyntheticEvent) => {
		setSelectedDay(e.target.value);
	};

	const openSetTimeModalHandler = (flag: TimeType) => {
		setOpenModalFlag(flag);
		modalIsOpen();

		const newWorkTimeOnModal = workTime?.[selectedDay]?.[flag as TimeType];
		console.log(newWorkTimeOnModal);
		if (!newWorkTimeOnModal) return;
		setWorkTimeOnModal(newWorkTimeOnModal);
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
		setWorkTime(updatedWorkTime);
	};
	const submitHandler = () => {
		if (isLoading) return;
		const body = {
			...user,
			workTime: getWorkTimeString(workTime),
		};

		putUser(body);
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

		setWorkTime(updatedWorkTime);
		setOpenModalFlag(null);
		setWorkTimeOnModal(INIT_WORK_TIME);
		modalIsClose();
		submitHandler();
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
		console.log(Object.fromEntries(tmp));
		setWorkTime(Object.fromEntries(tmp));
	}, [user]);
	return (
		<>
			<Header title="근무시간 수정" />
			<main className="h-[100vh] pt-[7.2rem]">
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
							mode="dark"
						/>
					</div>
				</div>
			</main>
			{isModalOpen && (
				<Overlay>
					<TopModal>
						<div className="space-y-[2.4rem]">
							<SetTimeButtons timeHandler={timeOnModalHandler} time={workTimeOnModal} mode="dark" />

							<Bar ClickFn={workTimeHandler}>완료</Bar>
						</div>
					</TopModal>
				</Overlay>
			)}
		</>
	);
}

export default WorkTimeSettingScreen;
