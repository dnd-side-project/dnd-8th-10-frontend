/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import Header from 'src/app.components/Header';
import { MutateTpye } from 'src/app.modules/api/client';
import EmptyGraphic from 'src/app.modules/assets/checklist/emptyGraphic.svg';
import Divider from 'src/app.components/Divider';
import { getCookie } from 'src/app.modules/cookie';
import { COOKIE_KEY } from 'src/app.modules/constants/Cookie';
import { PostCheckListBodyType, PutCheckListBodyType } from 'src/app.modules/api/checklist';
import { ICheckList } from '../types';
import NewbieGuide from '../components/NewbieGuide';
import AddTodo from '../components/AddTodo';
import CheckList from '../components/CheckList';
import WeekCalandar from '../components/WeekCalandar';

interface Props {
	isChecklistFetched: boolean;
	searchDate: string;
	searchDateHandler: (searchDateString: string) => void;
	checklist: ICheckList[];
	postChecklist: MutateTpye<PostCheckListBodyType>;
	postChecklistLoading: boolean;
	putChecklist: MutateTpye<PutCheckListBodyType>;
	putChecklistLoading: boolean;
	deleteChecklist: MutateTpye<number>;
	deleteChecklistLoading: boolean;
	weekState: boolean[];
	isWorkDay: boolean;
}
function CheckListScreen({
	searchDate,
	searchDateHandler,
	checklist,
	postChecklist,
	postChecklistLoading,
	putChecklist,
	putChecklistLoading,
	deleteChecklist,
	deleteChecklistLoading,
	weekState,
	isWorkDay,
	isChecklistFetched,
}: Props) {
	const addTodoHandler = (newTodo: string) => {
		if (postChecklistLoading) return;
		if (!newTodo.trim()) return;
		const status: ICheckList['status'] = 'N';
		const body = {
			date: searchDate,
			content: newTodo,
			status,
		};

		postChecklist(body);
	};

	const todoCheckStateHandler = (checkIdx: number, isChecked: boolean, content: string) => {
		if (putChecklistLoading) return;
		const status: ICheckList['status'] = isChecked ? 'Y' : 'N';
		const body = {
			checkIdx,
			content,
			status,
		};
		putChecklist(body);
	};
	const editTodoHandler = (checkIdx: number, content: string, status: ICheckList['status']) => {
		const body = {
			checkIdx,
			content,
			status,
		};
		putChecklist(body);
	};
	const deleteTodoHandler = (checkIdx: number) => {
		if (deleteChecklistLoading) return;
		deleteChecklist(checkIdx);
	};

	const setSearchDateHandler = (formattedSearchDate: string): void => {
		searchDateHandler(formattedSearchDate);
	};

	// TODO: mx-[-2rem] 속성없이 divider 꽉채우기

	return (
		<>
			<Header title="내 할일 점검" />

			<main className=" mx-[-2rem] pt-[7.2rem] ">
				<WeekCalandar weekState={weekState} searchDate={searchDate} onSearchDateChange={setSearchDateHandler} />

				<div className=" overflow-x-hidden px-[2rem]    relative">
					<Divider />
					{getCookie(COOKIE_KEY.IS_NEWBIE) && <NewbieGuide />}

					{isChecklistFetched && isWorkDay ? (
						<div className=" text-subhead2 space-y-[1.6rem] py-[2.4rem]  relative ">
							<AddTodo onAddTodo={addTodoHandler} />
							<CheckList
								checklist={checklist}
								onEditTodo={editTodoHandler}
								onDeleteTodo={deleteTodoHandler}
								onCheckTodo={todoCheckStateHandler}
							/>
						</div>
					) : (
						<EmptyGraphic className="mt-[7.2rem] mx-auto" />
					)}
				</div>
			</main>
		</>
	);
}

export default CheckListScreen;
