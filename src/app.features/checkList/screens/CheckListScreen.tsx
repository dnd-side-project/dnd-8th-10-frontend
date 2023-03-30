/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import Header from 'src/app.components/Header';
import { MutateTpye } from 'src/app.modules/api/client';
import EmptyGraphic from 'src/app.modules/assets/checklist/emptyGraphic.svg';
import { formatDate } from 'src/app.modules/util/formatDate';
import Divider from 'src/app.components/Divider';
import { getCookie } from 'src/app.modules/cookie';
import { COOKIE_KEY } from 'src/app.modules/constants/Cookie';
import { PostCheckListBodyType, PutCheckListBodyType } from 'src/app.modules/api/checklist';
import { ICheckList } from '../types';
import { getWeekDateList } from '../utils/getWeekDateList';
import { getKoreaTodayDateInfo } from '../utils/getKoreaTodayDateInfo';
import NewbieGuide from '../components/NewbieGuide';
import AddTodo from '../components/AddTodo';
import CheckList from '../components/CheckList';

interface Props {
	isChecklistFetched: boolean;
	todayString: string;
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
	todayString,
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
	const { year, month, date, day } = getKoreaTodayDateInfo();

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
		console.log(checkIdx);
		deleteChecklist(checkIdx);
	};
	const getSearchDateString = (weekIdx: number, selectedDate: number) => {
		const todayWeekIdx = day;
		let selectedMonth = month;
		let selectedYear = year;
		if (selectedDate < date && todayWeekIdx < weekIdx) {
			// 다음달로 넘어가는 경우
			if (month === 12) {
				selectedMonth = 1;
				selectedYear += 1;
			} else {
				selectedMonth += 1;
			}
		}
		if (selectedDate > date && todayWeekIdx > weekIdx) {
			// 이전달로 넘어가는 경우
			if (month === 1) {
				selectedMonth = 12;
				selectedYear -= 1;
			} else {
				selectedMonth -= 1;
			}
		}
		return formatDate(selectedYear, selectedMonth, selectedDate);
	};
	const setSearchDateHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: {
				dataset: { weekidx },
				value: selectedDate,
			},
		} = e;
		getSearchDateString(weekidx, selectedDate);
		searchDateHandler(getSearchDateString(weekidx, selectedDate));
	};
	const getButtonStyle = (weekIdx: number, selectedDate: number) => {
		const todayStyle =
			todayString === getSearchDateString(weekIdx, selectedDate) ? 'border-[0.15rem] border-primary' : '';

		if (weekState && weekState[weekIdx]) return `bg-primarySub text-primary ${todayStyle}`;
		return '';
	};
	const getDateTitle = () => {
		const [resYear, resMonth] = searchDate.split('-');
		return `${+resYear}년 ${+resMonth}월`;
	};

	// TODO: mx-[-2rem] 속성없이 divider 꽉채우기

	return (
		<>
			<Header title="내 할일 점검" />

			<main className=" mx-[-2rem] pt-[7.2rem] ">
				<div className="space-y-[2rem] px-[2rem] pb-[1.2rem]  bg-w ">
					<span className="text-g10 text-subhead4">{getDateTitle()}</span>
					<div className="text-g8 space-y-[1.6rem]">
						<ul className="grid grid-cols-7 text-g10 text-center text-body1 ">
							{['일', '월', '화', '수', '목', '금', '토'].map((w) => (
								<li key={w} className="first:text-g7  last:text-g7">
									{w}
								</li>
							))}
						</ul>
						<ul className="grid grid-cols-7 text-center text-body2 ">
							{getWeekDateList().map((w, index) => (
								<li key={index} className="first:text-g7 text-g10 last:text-g7">
									<button
										name="searchDate"
										value={w}
										data-weekidx={index}
										onClick={setSearchDateHandler}
										aria-pressed={+searchDate.split('-')[2] === +w}
										className={`aria-pressed:bg-primary aria-pressed:text-w ${getButtonStyle(
											index,
											w
										)}  w-[3.4rem] h-[3.4rem] rounded-[0.8rem]`}
									>
										{w}
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>

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
