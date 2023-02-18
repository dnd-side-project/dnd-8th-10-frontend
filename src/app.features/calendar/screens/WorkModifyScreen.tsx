import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import { useMutation } from '@tanstack/react-query';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import useModalStore from 'src/app.modules/store/modal';
import Header from 'src/app.components/Header';
import DelIcon from 'src/app.modules/assets/calendar/delete.svg';
import Bar from 'src/app.components/app.base/Button/Bar';
import useStore from '../store';
import useTimeSetStore from '../store/time';
import { delWorkModify, postWork, putWorkModify } from '../api';

type Flag = 'startTime' | 'endTime' | null;
function WorkModifyScreen() {
	const { isModalOpen, modalIsOpen } = useModalStore();
	const [workTime, setWorkTime] = useState<string>('');
	const { clickDay, toDay, workDay, isDayReset } = useStore();
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

	// 출근하기
	const { mutate: WorkMutate } = useMutation(postWork, {
		onSuccess: (res) => {
			console.log(res);
			router.back();
		},
		onError: (error) => alert('오류 발생.'),
	});

	// 수정하기
	const { mutate } = useMutation(putWorkModify, {
		onSuccess: (res) => {
			// console.log(res);
			router.back();
		},
		onError: (error) => console.log(error),
	});

	// 수정 버튼
	const modifyBtn = () => {
		const workTimeData = getWorkTimeString();
		const [start, end] = workTimeData.split('~');
		const startSplit = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
		const endSplit = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
		const timeDiff = Math.abs((startSplit - endSplit) / 60);
		if (!workDay && new Date(clickDay) < new Date(toDay)) {
			// 출근하기
			WorkMutate({ year, month, day, workTime: workTimeData, workHour: timeDiff });
		} else {
			mutate({ year, month, day, workTime: workTimeData, workHour: timeDiff });
		}

		isDayReset();
	};

	// 삭제 버튼
	const delBtn = () => {
		const data = delWorkModify({ year, month, day });
		data.then((res) => {
			isDayReset();
			router.back();
		});
	};

	return (
		<>
			<div className="h-[100vh] flex flex-col justify-between">
				<div>
					<div className="pb-[5.6rem]">
						<Header title="출근수정">
							<button type="button" onClick={() => modalIsOpen()}>
								<DelIcon />
							</button>
						</Header>
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
							{workTime !== ''
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
							{workTime !== '' ? workTime.split('~')[1] : `${endTime.hour}시 ${endTime.minute}분 ${endTime.meridiem}`}
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
						bgColor="bg-g2"
						titleColor="text-g7"
						ClickFn={() => {
							modifyBtn();
						}}
					>
						수정
					</Bar>
				</div>
			</div>
			{isModalOpen && (
				<>
					<Overlay />
					<Modal content="출근기록이 삭제됩니다!" deleteFn={() => delBtn()} />
				</>
			)}
		</>
	);
}

export default WorkModifyScreen;
