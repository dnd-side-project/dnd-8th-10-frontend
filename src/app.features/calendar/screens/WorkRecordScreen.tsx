import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import Header from 'src/app.components/Header';
import DelIcon from 'src/app.modules/assets/delete.svg';
import Bar from 'src/app.components/app.base/Button/Bar';
import {
	parseSetWorkTime,
	getDayOfWeek,
	getFirstTime,
	getLastTime,
	getTotalWorkHour,
	viewTimeFormat,
} from 'src/app.modules/util/calendar';
import KeypadDelIcon from 'src/app.modules/assets/inputDel.svg';
import { getWorkTimeString } from 'src/app.modules/util/getWorkTimeString';
import useModal from 'src/app.modules/hooks/useModal';
import { MutateTpye } from 'src/app.modules/api/client';
import useStore from '../store';
import useTimeSetStore, { IUser } from '../store/time';
import { delWorkModify, getToDay, getWorkList, MutateBody } from '../api';

type Flag = 'startTime' | 'endTime' | null;
interface Props {
	WorkMutate: MutateTpye<MutateBody>;
	ModifyMutate: MutateTpye<MutateBody>;
	UserData: { userName: string };
	title: string | string[] | undefined;
	id: string | string[] | undefined;
}
function WorkRecordScreen({ WorkMutate, ModifyMutate, UserData, title, id }: Props) {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { clickDay, isDayReset } = useStore();
	const [year, month, day] = clickDay.split('.');
	const [currentTime, setCurrentTime] = useState<IUser>();
	const [workingFirstTime, setWorkingFirstTime] = useState('');
	const [workingLastTime, setWorkingLastTime] = useState('');
	const [totalWorkTime, setTotalWorkTime] = useState<number>();

	const router = useRouter();
	const {
		user: { startTime, endTime },
		setTime,
		initUser,
		setInitTime,
		setStartTime,
		setEndTime,
	} = useTimeSetStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};
	// 수정 버튼
	const modifyBtn = async () => {
		const workTimeData = getWorkTimeString(startTime, endTime);
		const [start, end] = workTimeData.split('~');
		const startSplit = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
		const endSplit = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
		const timeDiff = Number(Math.abs((startSplit - endSplit) / 60));

		if (title === 'add') {
			// 출근하기
			WorkMutate({ year, month, day, workTime: workTimeData, workHour: timeDiff });
		} else {
			// 수정하기
			ModifyMutate({ year, month, day, workTime: workTimeData, workHour: timeDiff, timeCardId: Number(id) });
		}
		isDayReset();
	};
	// 삭제 버튼
	const delBtn = async () => {
		const data = delWorkModify(Number(id));
		data.then((res) => {
			isDayReset();
			router.back();
		});
	};

	useEffect(() => {
		// 오늘 추가일시
		if (UserData) {
			if (title === 'add') {
				const data = getToDay(getDayOfWeek(clickDay));
				data.then((res) => {
					if (res.data !== '') {
						setInitTime(parseSetWorkTime(res.data));
						setCurrentTime(parseSetWorkTime(res.data));
					}
				});
			} else {
				// 수정일시
				const data = getWorkList({ year, month, day });
				data.then((res) => {
					const getWorkTimes = res.data.data.filter((val: { timeCardId: number }) => val.timeCardId === Number(id));
					const firstTime = res.data.data.map((val: { workTime: string }) => val.workTime.split('~')[0]);
					const lastTime = res.data.data.map((val: { workTime: string }) => val.workTime.split('~')[1]);

					setWorkingFirstTime(getFirstTime(firstTime));
					setWorkingLastTime(getLastTime(lastTime));
					setTotalWorkTime(getTotalWorkHour(getFirstTime(firstTime), getLastTime(lastTime)));
					console.log(getWorkTimes[0].workTime);
					if (getWorkTimes.length > 0) {
						setInitTime(parseSetWorkTime(getWorkTimes[0].workTime));
						setCurrentTime(parseSetWorkTime(getWorkTimes[0].workTime));
					}
				});
			}
		}
		return () => initUser();
	}, [UserData]);

	const disabledFn = () => {
		if (title === 'modify') {
			if (currentTime) {
				return (
					getWorkTimeString(currentTime.startTime, currentTime?.endTime).split('~')[0] ===
						getWorkTimeString(startTime, endTime).split('~')[0] &&
					getWorkTimeString(currentTime.startTime, currentTime?.endTime).split('~')[1] ===
						getWorkTimeString(startTime, endTime).split('~')[1]
				);
			}
		} else if (title === 'add') {
			return (
				startTime.meridiem === null ||
				startTime.hour === '' ||
				startTime.minute === '' ||
				endTime.meridiem === null ||
				endTime.hour === '' ||
				endTime.minute === ''
			);
		}
		return false;
	};

	const timeReset = () => {
		if (openModalFlag === 'startTime') {
			setStartTime();
		} else {
			setEndTime();
		}
		return null;
	};

	return (
		<>
			<div className="h-[100vh] flex flex-col justify-between">
				<div>
					<div className="pb-[5.6rem]">
						{title === 'add' ? (
							<Header title="근무기록 추가" />
						) : (
							<Header title="출근수정">
								<button type="button" onClick={() => openModal()}>
									<DelIcon />
								</button>
							</Header>
						)}
					</div>
					<div className="flex text-g9 mb-[0.8rem] mt-[1.6rem]">
						<div className="w-[50%]">
							<span className="text-subhead3">시작</span>
						</div>
						<div className="w-[50%]">
							<span className="text-subhead3 ml-[1.4rem]">종료</span>
						</div>
					</div>
					<div className="flex items-center mb-[2.4rem]">
						<button
							onClick={() => setOpenModalFlag('startTime')}
							className={`${
								openModalFlag === 'startTime'
									? 'text-primary text-subhead2 border-solid border-[0.15rem] border-primary'
									: 'text-g7 text-body2'
							} w-[50%] flex justify-between items-center pl-[1.2rem] h-[4.8rem] bg-g1 rounded-[0.8rem]`}
						>
							{viewTimeFormat(startTime)}
							{openModalFlag === 'startTime' && (
								<div role="presentation" className="mr-[1.6rem]" onClick={() => timeReset()}>
									<KeypadDelIcon />
								</div>
							)}
						</button>
						<span className="text-subhead3 mx-[1rem]">~</span>
						<button
							onClick={() => setOpenModalFlag('endTime')}
							className={`${
								openModalFlag === 'endTime'
									? 'text-primary text-subhead2 border-solid border-[0.15rem] border-primary'
									: 'text-g7 text-body2'
							} w-[50%] flex justify-between items-center pl-[1.2rem] h-[4.8rem] bg-g1 rounded-[0.8rem]`}
						>
							{viewTimeFormat(endTime)}
							{openModalFlag === 'endTime' && (
								<div role="presentation" className="mr-[1.6rem]" onClick={() => timeReset()}>
									<KeypadDelIcon />
								</div>
							)}
						</button>
					</div>
					{openModalFlag !== null && (
						<div>
							<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
						</div>
					)}
				</div>

				<div className="mb-[2rem]">
					<Bar
						ClickFn={() => {
							modifyBtn();
						}}
						disabled={disabledFn()}
					>
						{title === 'add' ? '저장' : '수정'}
					</Bar>
				</div>
			</div>
			{isModalOpen && (
				<Overlay overlayClickFn={() => closeModal()}>
					<Modal
						title="출근기록이 삭제됩니다!"
						yesFn={() => delBtn()}
						yesTitle="삭제"
						noFn={() => closeModal()}
						noTitle="취소"
					/>
				</Overlay>
			)}
		</>
	);
}

export default WorkRecordScreen;
