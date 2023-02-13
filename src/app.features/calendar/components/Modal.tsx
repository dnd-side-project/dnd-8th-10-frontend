import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import { MutateTpye } from 'src/app.modules/api/client';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import { getToDay, getWorkList, MutateBody } from '../api';
import useStore from '../store';
import useTimeSetStore from '../store/time';

type Flag = 'startTime' | 'endTime' | null;
interface Props {
	WorkMutate: MutateTpye<MutateBody>;
}
function Modal({ WorkMutate }: Props) {
	const { toDay, workDay, modalIsClose, isDayReset } = useStore();
	const [workTime, setWorkTime] = useState<string>('');
	const { clickDay } = useStore();
	const router = useRouter();
	const {
		user: { startTime, endTime },
		setTime,
	} = useTimeSetStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const [year, month, day] = clickDay.split('.');
	const [userName, setUserName] = useState([]);

	useEffect(() => {
		setOpenModalFlag(null);
		return () => setUserName([]);
	}, [clickDay]);

	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const { name, value } = e.target;
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
	// 출근하기 버튼
	const commute = () => {
		const workTimeData = workTime || getWorkTimeString();
		const [start, end] = workTimeData.split('~');
		const startSplit = Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]);
		const endSplit = Number(end.split(':')[0]) * 60 + Number(end.split(':')[1]);
		const timeDiff = Math.abs((startSplit - endSplit) / 60);
		WorkMutate({ year, month, day, workTime: workTimeData, workHour: timeDiff });
		isDayReset();
		modalIsClose();
	};

	// 오늘 누른 경우
	if (!workDay && clickDay === toDay) {
		const data = getToDay(getDayOfWeek(clickDay));
		data.then((res) => {
			// 여러번 요청감
			if (res.data !== '') {
				setWorkTime(res.data);
			}
		});
	}

	// 과거 누른 경우 & 출근한 날 누른 경우
	if (workDay && new Date(clickDay) <= new Date(toDay) && userName.length === 0) {
		const data = getWorkList({ year, month, day });
		data.then((res) => {
			setUserName(res.data.data);
		});
	}

	const workModify = () => {
		modalIsClose();
		router.push(`${SERVICE_URL.calendarModify}`);
	};

	const renderContent = () => {
		// 금일 클릭시
		if (!workDay && clickDay === toDay) {
			// 출근하기
			return (
				<div className="px-[2rem] py-[4rem] text-[2rem]">
					<div className="flex">
						<div className="w-[50%] font-semibold">시작</div>
						<div className="w-[50%] font-semibold">종료</div>
					</div>
					<div className="flex items-center my-3">
						<button
							onClick={() => setOpenModalFlag('startTime')}
							className="w-[50%] px-[1.5rem] py-[1.5rem] bg-white rounded-lg"
						>
							{workTime !== ''
								? workTime.split('~')[0]
								: `${startTime.hour}시 ${startTime.minute}분 ${startTime.meridiem}`}
						</button>
						<span className="mx-[10px]">~</span>
						<button
							onClick={() => setOpenModalFlag('endTime')}
							className="w-[50%] px-[1.5rem] py-[1.5rem] bg-white rounded-lg"
						>
							{workTime !== '' ? workTime.split('~')[1] : `${endTime.hour}시 ${endTime.minute}분 ${endTime.meridiem}`}
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
							className="bg-[#D9D9D9] w-full py-[2rem] font-semibold rounded-lg"
							onClick={() => commute()}
						>
							출근하기
						</button>
					</div>
				</div>
			);
		}

		if (!workDay || new Date(clickDay) > new Date(toDay)) {
			// 근무 안된 날짜 클릭시, 미래 클릭시
			return (
				<div className="px-[2rem] py-[4rem] text-[2rem]">
					<div className="flex justify-between">
						<div>{clickDay}</div>
						<div>{new Date(clickDay) < new Date(toDay) && <button onClick={() => workModify()}>출근수정</button>}</div>
					</div>
					<div>아직 기록이 없어요.</div>
				</div>
			);
		}
		// 출근된 날짜 클릭시
		return (
			<div className="px-[2rem] py-[4rem] text-[2rem]">
				<div className="flex justify-between">
					<div>{clickDay}</div>
					<button onClick={() => workModify()}>출근수정</button>
				</div>
				<div>
					{userName.map((item: { name: string; workTime: string }, index) => (
						<div key={index}>
							{item.name} - {item?.workTime}
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="z-10 w-[46rem] bg-[#F8F8F8] absolute bottom-0 flex-col items-center justify-center">
			<div className="flex justify-center mt-3">
				<button type="button" onClick={() => modalIsClose()} className="w-[55px] h-[4px] bg-[#D9D9D9] rounded-lg">
					{' '}
				</button>
			</div>
			{renderContent()}
		</div>
	);
}

export default Modal;
