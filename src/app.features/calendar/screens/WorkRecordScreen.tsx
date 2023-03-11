import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import Header from 'src/app.components/Header';
import DelIcon from 'src/app.modules/assets/delete.svg';
import Bar from 'src/app.components/app.base/Button/Bar';
import { parseSetWorkTime, getDayOfWeek, viewTimeFormat, workTimeDuplication } from 'src/app.modules/util/calendar';
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
	const { isModalOpen: isDelModalOpen, openModal: delOpenModal, closeModal: delCloseModal } = useModal();
	const { isModalOpen: isDupleModalOpen, openModal: DupleOpenModal, closeModal: DupleCloseModal } = useModal();
	const { isModalOpen: isRecordModalOpen, openModal: RecordOpenModal, closeModal: RecordCloseModal } = useModal();
	const { clickDay, setRecordComplete } = useStore();
	const [year, month, day] = clickDay.split('.');
	const [currentTime, setCurrentTime] = useState<IUser>();
	const [workingTime, setWorkingTime] = useState([]);

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
		// 출근 시간 겹칠때
		if (workTimeDuplication(workTimeData, workingTime)) {
			DupleOpenModal();
			return;
		}
		if (title === 'add') {
			// 출근하기
			WorkMutate({ year, month, day, workTime: workTimeData, workHour: timeDiff });
		} else {
			// 수정하기
			ModifyMutate({ year, month, day, workTime: workTimeData, workHour: timeDiff, timeCardId: Number(id) });
		}
		setRecordComplete();
	};

	// 삭제 버튼
	const delBtn = async () => {
		const data = delWorkModify(Number(id));
		data.then((res) => {
			setRecordComplete();
			router.back();
		});
	};

	// 자신의 출근한 리스트 가져옴 (중복 방지를 위해)
	const getWorkListData = (type = 'add') => {
		const workListData = getWorkList({ year, month, day });
		workListData.then((res) => {
			let getMyWorkTimes = res.data.data.filter((val: { name: string }) => val.name === UserData.userName);
			if (type === 'modify') {
				// 수정일때 현재의 수정 시간은 중복에서 포함 안함
				getMyWorkTimes = getMyWorkTimes.filter((val: { timeCardId: number }) => val.timeCardId !== Number(id));
			}
			if (getMyWorkTimes.length > 0) {
				const myWorkTimes = getMyWorkTimes.map((val: { workTime: string }) => val.workTime);
				setWorkingTime(myWorkTimes);
			}
		});
	};

	useEffect(() => {
		if (UserData) {
			if (title === 'add') {
				getWorkListData();
				// 추가일시
				const toDayData = getToDay(getDayOfWeek(clickDay));
				toDayData.then((res) => {
					if (res.data !== '') {
						setInitTime(parseSetWorkTime(res.data));
						setCurrentTime(parseSetWorkTime(res.data));
					}
				});
			} else {
				// 수정일시
				getWorkListData('modify');
				const data = getWorkList({ year, month, day });
				data.then((res) => {
					const getWorkTime = res.data.data.filter((val: { timeCardId: number }) => val.timeCardId === Number(id));
					if (getWorkTime.length > 0) {
						setInitTime(parseSetWorkTime(getWorkTime[0].workTime));
						setCurrentTime(parseSetWorkTime(getWorkTime[0].workTime));
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
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (openModalFlag !== null) {
			if (isFirstRender.current) {
				isFirstRender.current = false;
				return;
			}
			if (openModalFlag === 'startTime') {
				if (endTime.meridiem === null || endTime.hour === '' || endTime.minute === '') {
					RecordOpenModal();
				}
			} else if (startTime.meridiem === null || startTime.hour === '' || startTime.minute === '') {
				RecordOpenModal();
			}
		}
	}, [openModalFlag]);

	const toggleRecordOpenModalFlag = () => {
		if (openModalFlag === 'startTime') {
			setOpenModalFlag('endTime');
		} else {
			setOpenModalFlag('startTime');
		}
		RecordCloseModal();
		isFirstRender.current = true;
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
								<button type="button" onClick={() => delOpenModal()}>
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
									? 'text-primary text-subhead2 border-solid border-[0.15rem] border-primary pl-[1.05rem]'
									: 'text-g7 text-body2 pl-[1.2rem]'
							} w-[50%] flex justify-between items-center h-[4.8rem] bg-g1 rounded-[0.8rem]`}
						>
							{viewTimeFormat(startTime)}
							{openModalFlag === 'startTime' && (
								<div role="presentation" className="mr-[1.6rem]" onClick={() => timeReset()}>
									<KeypadDelIcon />
								</div>
							)}
						</button>
						<span className="text-subhead3 mx-[1rem] text-g9">~</span>
						<button
							onClick={() => setOpenModalFlag('endTime')}
							className={`${
								openModalFlag === 'endTime'
									? 'text-primary text-subhead2 border-solid border-[0.15rem] border-primary  pl-[1.05rem]'
									: 'text-g7 text-body2 pl-[1.2rem]'
							} w-[50%] flex justify-between items-center h-[4.8rem] bg-g1 rounded-[0.8rem]`}
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
			{isDelModalOpen && (
				<Overlay overlayClickFn={() => delCloseModal()}>
					<Modal
						title="출근기록이 삭제됩니다!"
						yesFn={() => delBtn()}
						yesTitle="삭제"
						noFn={() => delCloseModal()}
						noTitle="취소"
					/>
				</Overlay>
			)}
			{isDupleModalOpen && (
				<Overlay overlayClickFn={() => DupleCloseModal()}>
					<Modal
						title="금일 근무시간과 겹칩니다."
						subTitle="다시 입력해 주세요!"
						yesFn={() => DupleCloseModal()}
						yesTitle="확인"
					/>
				</Overlay>
			)}
			{isRecordModalOpen && (
				<Overlay overlayClickFn={() => toggleRecordOpenModalFlag()}>
					<Modal
						title={`${openModalFlag === 'startTime' ? '종료 시간' : '시작 시간'}을 다 입력해주세요`}
						yesFn={() => toggleRecordOpenModalFlag()}
						yesTitle="확인"
					/>
				</Overlay>
			)}
		</>
	);
}

export default WorkRecordScreen;
