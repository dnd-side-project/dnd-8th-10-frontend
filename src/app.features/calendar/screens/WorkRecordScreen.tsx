import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import useModalStore from 'src/app.modules/store/modal';
import Header from 'src/app.components/Header';
import DelIcon from 'src/app.modules/assets/delete.svg';
import Bar from 'src/app.components/app.base/Button/Bar';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import { MutateTpye } from 'src/app.modules/api/client';
import useStore from '../store';
import useTimeSetStore from '../store/time';
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
	const { isModalOpen, modalIsOpen } = useModalStore();
	const [workTime, setWorkTime] = useState<string>('');
	const { clickDay, isDayReset } = useStore();
	const [year, month, day] = clickDay.split('.');
	const router = useRouter();
	const {
		user: { startTime, endTime },
		setTime,
	} = useTimeSetStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;
		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};

	const getWorkTimeString = () => {
		try {
			return `${startTime.hour.length === 1 && startTime.meridiem === 'am' ? '0' : ''}${
				+startTime.hour + (startTime.meridiem === 'am' ? 0 : 12)
			}:${startTime.minute.length === 1 ? '0' : ''}${startTime.minute}~${
				endTime.hour.length === 1 && endTime.meridiem === 'am' ? '0' : ''
			}${+endTime.hour + (endTime.meridiem === 'am' ? 0 : 12)}:${endTime.minute.length === 1 ? '0' : ''}${
				endTime.minute
			}`;
		} catch (e) {
			console.log(e);
			return '';
		}
	};

	// 수정 버튼
	const modifyBtn = async () => {
		let workTimeData;
		if (getWorkTimeString() !== '00:00~00:00') {
			workTimeData = getWorkTimeString();
		} else {
			workTimeData = workTime;
		}
		const [start, end] = workTimeData.split('~');
		const startSplit = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
		const endSplit = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
		const timeDiff = Math.abs((startSplit - endSplit) / 60);
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
						setWorkTime(res.data);
					}
				});
			} else {
				// 수정일시
				const data = getWorkList({ year, month, day });
				data.then((res) => {
					const getWorkTime = res.data.data.filter((val: { timeCardId: number }) => val.timeCardId === Number(id));
					if (getWorkTime.length > 0) {
						setWorkTime(getWorkTime[0].workTime);
					}
				});
			}
		}
	}, [UserData]);

	return (
		<>
			<div className="h-[100vh] flex flex-col justify-between">
				<div>
					<div className="pb-[5.6rem]">
						{title === 'add' ? (
							<Header title="근무기록 추가" />
						) : (
							<Header title="출근수정">
								<button type="button" onClick={() => modalIsOpen()}>
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
									? 'text-g9 text-subhead2 border-solid border-[0.15rem] border-primary'
									: 'text-g7 text-body2'
							} w-[50%] h-[4.8rem] bg-g1 rounded-[0.8rem]`}
						>
							{workTime !== '' && `${startTime.hour}${startTime.minute}${startTime.meridiem}` === '00am'
								? workTime.split('~')[0]
								: `${startTime.hour}시 ${startTime.minute}분 ${startTime.meridiem}`}
						</button>
						<span className="text-subhead3 mx-[1rem]">~</span>
						<button
							onClick={() => setOpenModalFlag('endTime')}
							className={`${
								openModalFlag === 'endTime'
									? 'text-g9 text-subhead2 border-solid border-[0.15rem] border-primary'
									: 'text-g7 text-body2'
							} w-[50%] h-[4.8rem] bg-g1 rounded-[0.8rem]`}
						>
							{workTime !== '' && `${endTime.hour}${endTime.minute}${endTime.meridiem}` === '00am'
								? workTime.split('~')[1]
								: `${endTime.hour}시 ${endTime.minute}분 ${endTime.meridiem}`}
						</button>
					</div>
					{openModalFlag !== null && (
						<div>
							<SetTimeButtons
								mode="dark"
								timeHandler={timeHandler}
								time={openModalFlag === 'startTime' ? startTime : endTime}
							/>
						</div>
					)}
				</div>

				<div className="mb-[2rem]">
					<Bar
						ClickFn={() => {
							modifyBtn();
						}}
					>
						{title === 'add' ? '추가' : '수정'}
					</Bar>
				</div>
			</div>
			{isModalOpen && (
				<Overlay>
					<Modal title="출근기록이 삭제됩니다!" yesFn={() => delBtn()} yesTitle="삭제" />
				</Overlay>
			)}
		</>
	);
}

export default WorkRecordScreen;
