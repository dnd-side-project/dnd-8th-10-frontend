import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useModalStore from 'src/app.modules/store/modal';
import { crossDate, getDayOfWeek } from 'src/app.modules/util/calendar';
import useTimeSetStore from '../store/time';
import { getToDay, getWorkList, MutateBody } from '../api';
import useStore from '../store';
import Keypad from './Modal/Keypad';
import Working from './Modal/Working';
import NoneWork from './Modal/NoneWork';
import GrayWork from './Modal/GrayWork';

type Flag = 'startTime' | 'endTime' | null;

interface Props {
	WorkMutate: MutateTpye<MutateBody>;
}
function ModalWrap({ WorkMutate }: Props) {
	const { toDay, workDay, isDayReset, year, month } = useStore();
	const { modalIsClose } = useModalStore();
	const [workTime, setWorkTime] = useState<string>('');
	const { clickDay } = useStore();
	const router = useRouter();
	const {
		user: { startTime, endTime },
		initUser,
	} = useTimeSetStore();

	const [clickYear, clickMonth, day] = clickDay.split('.');
	// 크로스 브라우징 이슈 해결
	const { clickDayData, toDayData } = crossDate(clickDay, toDay);
	const [userName, setUserName] = useState([]);
	useEffect(() => {
		initUser();
		return () => setUserName([]);
	}, [clickDay]);

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
		WorkMutate({ year: clickYear, month: clickMonth, day, workTime: workTimeData, workHour: timeDiff });
		isDayReset();
		modalIsClose();
	};

	useEffect(() => {
		// 오늘 누른 경우
		if (!workDay && clickDay === toDay) {
			const data = getToDay(getDayOfWeek(clickDay));
			data.then((res) => {
				if (res.data !== '') {
					setWorkTime(res.data);
				}
			});
		}
		// 과거 누른 경우 & 출근한 날 누른 경우
		if (workDay && clickDayData <= toDayData && userName.length === 0) {
			const data = getWorkList({ year: clickYear, month: clickMonth, day });
			data.then((res) => {
				setUserName(res.data.data);
			});
		}
	}, [clickDay]);

	const workModify = () => {
		modalIsClose();
		router.push(`${SERVICE_URL.calendarModify}`);
	};

	const renderContent = () => {
		if (clickDay === 'keypad') {
			return <Keypad year={year} month={month} />;
		}
		if (!workDay && clickDay === toDay) {
			// 금일 클릭시, 출근하기
			return <Working workTime={workTime} commute={commute} />;
		}
		if (!workDay || clickDayData > toDayData) {
			// 근무 안된 날짜 클릭시, 미래 클릭시
			return (
				<NoneWork month={month} day={day} clickDayData={clickDayData} toDayData={toDayData} workModify={workModify} />
			);
		}
		// 그외 출근한 날들 유저 리스트
		return <GrayWork month={month} day={day} userName={userName} workModify={workModify} />;
	};

	return <div>{renderContent()}</div>;
}

export default ModalWrap;
