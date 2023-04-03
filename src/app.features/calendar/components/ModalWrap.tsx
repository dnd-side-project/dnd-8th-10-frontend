import React, { useEffect, useState } from 'react';
import { crossDate } from 'src/app.modules/util/calendar';
import { useQuery } from '@tanstack/react-query';
import { getWorkList } from '../api';
import useStore from '../store';
import Keypad from './Modal/Keypad';
import FutureWork from './Modal/FutureWork';
import WorkList from './Modal/WorkList';

interface Props {
	currentUser: string;
	closeModal: () => void;
}
function ModalWrap({ currentUser, closeModal }: Props) {
	const { toDay, year, month } = useStore();
	const { clickDay } = useStore();
	const [clickYear, clickMonth, day] = clickDay.split('.');
	const { clickDayData, toDayData } = crossDate(clickDay, toDay);
	const [userName, setUserName] = useState([]);

	useEffect(() => {
		return () => {
			setUserName([]);
			closeModal();
		};
	}, [clickDay]);

	const { data, refetch: getWorkListRefetch } = useQuery(
		['workList'],
		() => getWorkList({ year: clickYear, month: clickMonth, day }),
		{
			select: (res) => res.data.data,
			onSuccess: (res) => {
				setUserName(res);
			},
		}
	);

	useEffect(() => {
		// 미래 제외 누른 경우, 유저 리스트 받아오기
		getWorkListRefetch();
	}, [clickDay]);

	const renderContent = () => {
		// 키패드 오픈
		if (clickDay === 'keypad') {
			return <Keypad year={year} month={month} />;
		}
		// 미래 클릭
		if (clickDayData > toDayData) {
			return <FutureWork month={month} day={day} />;
		}
		// 그외 출근한 유저 리스트
		return <WorkList month={month} day={day} userName={userName} currentUser={currentUser} />;
	};

	return <div>{renderContent()}</div>;
}

export default ModalWrap;
