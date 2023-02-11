import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SetTimeButtons from 'src/app.components/SetTimeButtons';
import { useMutation } from '@tanstack/react-query';
import useTimeSetStore from '../store/time';
import { delWorkModify, putWorkModify } from '../api';
import useStore from '../store';

type Flag = 'startTime' | 'endTime' | null;
function WorkModifyScreen() {
	const [workTime, setWorkTime] = useState<string | undefined>('');
	const { isDay, isDayReset } = useStore();
	const [year, month, day] = isDay.split('.');
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
		const wrkTimeData = getWorkTimeString();
		const [start, end] = wrkTimeData.split('~');
		const startSplit = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
		const endSplit = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
		const timeDiff = Math.abs((startSplit - endSplit) / 60);
		mutate({ year, month, day, workTime: wrkTimeData, workHour: timeDiff });
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
			<button type="button" onClick={() => delBtn()}>
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
			<div>
				<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
			</div>
			<div className="mt-5 mb-7">
				<button
					type="button"
					onClick={() => modifyBtn()}
					className="bg-[#D9D9D9] w-full py-[2rem] font-semibold rounded-lg"
				>
					수정
				</button>
			</div>
		</div>
	);
}

export default WorkModifyScreen;
