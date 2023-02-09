import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import CheckListScreen from 'src/app.features/checkList/screens/CheckListScreen';
import { getCheckList, postCheckList, putCheckList } from 'src/app.modules/api/checklist';

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
	const { data, refetch } = useQuery(['checklist'], () => getCheckList(date), {
		select: (res) => res.data.data.list,
		onSuccess: (res) => console.log(res),
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
	// TODO: get 제외하고 합쳐도 될듯
	const { mutate: postChecklist, isLoading: postChecklistLoading } = useMutation(postCheckList, {
		onSuccess: (res) => {
			refetch();
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	const { mutate: putChecklist, isLoading: putChecklistLoading } = useMutation(putCheckList, {
		onSuccess: (res) => {
			refetch();
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	return (
		<CheckListScreen
			searchDate={date}
			searchDateHandler={searchDateHandler}
			checklist={data}
			postChecklist={postChecklist}
			postChecklistLoading={postChecklistLoading}
			putChecklist={putChecklist}
			putChecklistLoading={putChecklistLoading}
		/>
	);
}

export default checkList;
