import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import { useMutation } from '@tanstack/react-query';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import useModalStore from 'src/app.modules/store/modal';
import useTimeSetStore from '../store/time';
import { delWorkModify, postWork, putWorkModify } from '../api';
import useStore from '../store';

type Flag = 'startTime' | 'endTime' | null;
function WorkModifyScreen() {
	const { isModalOpen, modalIsOpen } = useModalStore();
	const [workTime, setWorkTime] = useState<string | undefined>('');
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
		<div className="text-[2rem] mx-[1.5rem] my-[2rem]">
			<div>출근수정</div>
			<button type="button" onClick={() => modalIsOpen()}>
				삭제
			</button>
			<div className="flex items-center my-3">
				<button
					onClick={() => setOpenModalFlag('startTime')}
					className="w-[50%] px-[1.5rem] py-[1.5rem] bg-white rounded-lg"
				>
					{startTime.hour}시 {startTime.minute}분 {startTime.meridiem}
				</button>
				<span className="mx-[10px]">~</span>
				<button
					onClick={() => setOpenModalFlag('endTime')}
					className="w-[50%] px-[1.5rem] py-[1.5rem] bg-white rounded-lg"
				>
					{endTime.hour}시 {endTime.minute}분 {endTime.meridiem}
				</button>
			</div>
			{openModalFlag !== null && (
				// 클릭한 날이 일하는 날이면 시간 받아온거 뿌리기
				// 클릭한 날이 일하는 날이 아니면 00시 00분
				<div>
					<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
				</div>
			)}
			<div className="mt-5 mb-7">
				<button
					type="button"
					onClick={() => modifyBtn()}
					className="bg-[#D9D9D9] w-full py-[2rem] font-semibold rounded-lg"
				>
					수정
				</button>
			</div>
			{isModalOpen && (
				<>
					<Overlay />
					<Modal content="출근기록이 삭제됩니다!" deleteFn={() => delBtn()} />
				</>
			)}
		</div>
	);
}

export default WorkModifyScreen;
