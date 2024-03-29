import React, { useEffect, useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import Header from 'src/app.components/Header';
import Overlay from 'src/app.components/Modal/Overlay';
import { MutateTpye } from 'src/app.modules/api/client';
import { dayMapReverse, DayTextType, WeekWorkTimeType } from 'src/app.modules/types/workTime';
import { getUserWeekWorkTimeString } from 'src/app.modules/util/getWorkTimeString';
import DeleteIcon from 'src/app.modules/assets/delete.svg';
import useModal from 'src/app.modules/hooks/useModal';
import Modal from 'src/app.components/Modal/Modal';
import { MutateUserBodyType } from 'src/app.modules/api/user';
import { IUser } from 'src/app.modules/types/user';
import { WeekWorkTimeForm } from 'src/app.components/UserForm/WeekWorkTimeForm';

interface Props {
	user: IUser;
	putUser: MutateTpye<MutateUserBodyType>;
	isLoading: boolean;
}
// TODO: 출퇴근 시간 모두 기입해야 수정,등록하게 수정필요
function WorkTimeSettingScreen({ user, putUser, isLoading }: Props) {
	const { isModalOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
	const [workTimeObj, setWorkTimeObj] = useState<WeekWorkTimeType | null>(null);

	const submitHandler = () => {
		if (isLoading) return;
		if (!workTimeObj) return;
		const body = {
			...user,
			workTime: getUserWeekWorkTimeString(workTimeObj),
		};
		putUser(body);
	};

	useEffect(() => {
		if (!user) return;
		const tmp = user.workTime.split(',').map((item) => {
			const dayNum = dayMapReverse.get(item[0] as DayTextType);
			const [startTime, endTime] = item.split('~');
			const [startTimeHour, startTimeMinute] = startTime.slice(2).split(':');
			const [endTimeHour, endTimeMinute] = endTime.split(':');
			return [
				dayNum,
				{
					startTime: {
						meridiem: +startTimeHour < 12 || +startTimeHour === 24 ? 'am' : 'pm',
						hour: `${+startTimeHour % 12}`,
						minute: `${+startTimeMinute}`,
					},
					endTime: {
						meridiem: +endTimeHour < 12 || +endTimeHour === 24 ? 'am' : 'pm',
						hour: `${+endTimeHour % 12}`,
						minute: `${+endTimeMinute.slice(0, 2)}`,
					},
				},
			];
		});
		setWorkTimeObj(Object.fromEntries(tmp));
	}, [user]);
	const workTimeObjHandler = (newWorkTimeObj: WeekWorkTimeType) => {
		setWorkTimeObj(newWorkTimeObj);
	};
	const getTimeIsValid = (): boolean => {
		// 선택된 요일마다 출,퇴근 시간이 모두 입력되어있는지 확인
		if (workTimeObj === null || workTimeObj === undefined) return true;
		return Boolean(Object.entries(workTimeObj).filter(([_, value]) => Object.keys(value).length !== 2).length);
	};
	return (
		<>
			<Header title="근무시간 수정">
				<button aria-label="근무시간 전체 삭제" onClick={openDeleteModal}>
					<DeleteIcon />
				</button>
			</Header>
			<main className="h-full pt-[7.2rem] relative">
				<WeekWorkTimeForm workTimeObj={workTimeObj} onWorkTimeChange={workTimeObjHandler} />
				<div className="absolute bottom-[2rem] w-full">
					<Bar disabled={getTimeIsValid()} ClickFn={submitHandler}>
						수정
					</Bar>
				</div>
			</main>

			{isDeleteModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeDeleteModal();
					}}
				>
					<Modal
						title="전체 근무시간을 삭제할까요?"
						yesFn={() => {
							setWorkTimeObj(null);
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
