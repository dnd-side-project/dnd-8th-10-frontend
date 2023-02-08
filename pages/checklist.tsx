import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import CheckListScreen from 'src/app.features/checkList/screens/CheckListScreen';
import { getCheckList } from 'src/app.modules/api/checklist';

function checkList() {
	const formatDate = (year: number, month: number, date: number) => {
		return `${year}-${month > 9 ? month : `0${month}`}-${date > 9 ? date : `0${date}`}`;
	};
	const todayDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1;
		const day = today.getDate();
		console.log(formatDate(year, month, day));
		return formatDate(year, month, day);
	};

	const [date, setDate] = useState<string>(todayDate());
	const searchDateHandler = (searchYear: number, searchMonth: number, searchDate: number) => {
		setDate(formatDate(searchYear, searchMonth, searchDate));
	};
	const { data } = useQuery(['checklist'], () => getCheckList(date), {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	return <CheckListScreen searchDateHandler={searchDateHandler} />;
}

export default checkList;
