import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import CheckListScreen from 'src/app.features/checkList/screens/CheckListScreen';
import {
	deleteCheckList,
	getCheckList,
	getWeekState,
	postCheckList,
	putCheckList,
} from 'src/app.modules/api/checklist';
import { formatDate } from 'src/app.modules/util/formatDate';

function checkList() {
	const todayDate = () => {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1;
		const day = today.getDate();
		return formatDate(year, month, day);
	};

	const [date, setDate] = useState<string>(todayDate());
	const searchDateHandler = (searchDateString: string) => {
		setDate(searchDateString);
	};
	const { data: checklist, refetch } = useQuery(['checklist'], () => getCheckList(date), {
		select: (res) => res.data.data.list,
		onSuccess: (res) => console.log(res),
		onError: (error) => {
			console.log(error);
		},
	});
	const { data: weekState, refetch: weekStateRefetch } = useQuery(['checklist', 'weekState'], getWeekState, {
		select: (res) => res.data.data,
		onSuccess: (res) => console.log(res, 'asfln'),
		onError: (error) => {
			console.log(error);
		},
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
			weekStateRefetch();
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	const { mutate: deleteChecklist, isLoading: deleteChecklistLoading } = useMutation(deleteCheckList, {
		onSuccess: (res) => {
			refetch();
			weekStateRefetch();
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	useEffect(() => {
		console.log(date);
		refetch();
	}, [date, refetch]);
	return (
		<CheckListScreen
			todayString={todayDate()}
			searchDate={date}
			searchDateHandler={searchDateHandler}
			checklist={checklist}
			weekState={weekState}
			postChecklist={postChecklist}
			postChecklistLoading={postChecklistLoading}
			putChecklist={putChecklist}
			putChecklistLoading={putChecklistLoading}
			deleteChecklist={deleteChecklist}
			deleteChecklistLoading={deleteChecklistLoading}
		/>
	);
}

export default checkList;
