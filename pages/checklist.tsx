import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ICheckList } from 'src/app.features/checkList/types';
import CheckListScreen from 'src/app.features/checkList/screens/CheckListScreen';
import {
	deleteCheckList,
	getCheckList,
	getWeekState,
	postCheckList,
	putCheckList,
} from 'src/app.modules/api/checklist';
import { NextPage } from 'next';
import { TODAY_STRING } from 'src/app.features/checkList/constants/todayString';

const checkList: NextPage = () => {
	const [date, setDate] = useState<string>(TODAY_STRING);
	const [localChecklist, setLocalChecklist] = useState<ICheckList[]>([]);
	const searchDateHandler = (searchDateString: string) => {
		setDate(searchDateString);
	};

	// TODO: useQueries로 데이터 병렬로 요청하기
	const {
		data: checklist,
		refetch,
		isFetched: isChecklistFetched,
	} = useQuery(['checklist'], () => getCheckList(date), {
		select: (res) => res.data.data,
		onSuccess: async (res) => {
			console.log('res', res.workDay);
			setLocalChecklist(res.list);
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: true,
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
		onMutate: (newTodo) => {
			if (localChecklist) {
				setLocalChecklist([{ ...newTodo, checkIdx: -1 }, ...localChecklist]);
			}
			return { localChecklist };
		},
		onSuccess: () => {
			refetch();
		},
		onError: (error, values, context) => {
			if (context?.localChecklist) {
				setLocalChecklist(context.localChecklist);
			}
			alert('오류 발생.');
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
		onMutate: (checkIdx) => {
			if (localChecklist) {
				const deleted = localChecklist.filter((item) => item.checkIdx !== checkIdx);
				setLocalChecklist(deleted);
			}
			return { localChecklist };
		},
		onSuccess: (res) => {
			refetch();
			weekStateRefetch();
		},
		onError: (error, values, context) => {
			if (context?.localChecklist) {
				setLocalChecklist(context.localChecklist);
			}
			alert('오류 발생.');
		},
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
			isChecklistFetched={isChecklistFetched}
			isWorkDay={checklist?.workDay}
			searchDate={date}
			searchDateHandler={searchDateHandler}
			checklist={localChecklist}
			weekState={weekState}
			postChecklist={postChecklist}
			postChecklistLoading={postChecklistLoading}
			putChecklist={putChecklist}
			putChecklistLoading={putChecklistLoading}
			deleteChecklist={deleteChecklist}
			deleteChecklistLoading={deleteChecklistLoading}
		/>
	);
};

export default checkList;
