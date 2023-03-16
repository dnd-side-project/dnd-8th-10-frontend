/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import { PostCheckListBody, PutCheckListBody } from 'src/app.modules/api/checklist';
import { MutateTpye } from 'src/app.modules/api/client';
import SettingIcon from 'src/app.modules/assets/checklist/ellipsis.svg';
import EmptyGraphic from 'src/app.modules/assets/checklist/emptyGraphic.svg';
import AddTodoIcon from 'src/app.modules/assets/checklist/addTodo.svg';
import TrashIcon from 'src/app.modules/assets/checklist/trash.svg';
import AddTodoDecoIcon from 'src/app.modules/assets/checklist/addInputDeco.svg';
import { formatDate } from 'src/app.modules/util/formatDate';
import Divider from 'src/app.components/Divider';
import { ICheckList } from '../\btypes';

const getKoreaToday = () => {
	const DATE = new Date(); // 현재 날짜(로컬 기준) 가져오기
	const utc = DATE.getTime() + DATE.getTimezoneOffset() * 60 * 1000; // utc 표준시 도출
	const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
	const today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	const day = today.getDay();
	return {
		year,
		month,
		date,
		day,
	};
};
const getPrevMonthLastDayInfo = (curYear: number, curMonth: number) => {
	// getDay() -> 월요일이 1번
	// 이전 달의 마지막 날 날짜와 요일 구하기
	const lastDay = new Date(curYear, curMonth - 1, 0);
	const prevMonthLastDate = lastDay.getDate();
	const prevMonthLastDay = lastDay.getDay();
	return {
		prevMonthLastDate,
		prevMonthLastDay,
	};
};
const getCurMonthLastDayInfo = (curYear: number, curMonth: number) => {
	const lastDay = new Date(curYear, curMonth, 0);
	const curMonthLastDate = lastDay.getDate();
	return {
		curMonthLastDate,
	};
};

interface Props {
	isChecklistFetched: boolean;
	todayString: string;
	searchDate: string;
	searchDateHandler: (searchDateString: string) => void;
	checklist: ICheckList[];
	postChecklist: MutateTpye<PostCheckListBody>;
	postChecklistLoading: boolean;
	putChecklist: MutateTpye<PutCheckListBody>;
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
	const { year, month, date, day } = getKoreaToday();
	const [addTodoInputOpen, setAddTodoInputOpen] = useState<boolean>(false);
	const [editTodoInputOpenIdx, setEditTodoInputOpenIdx] = useState<number | null>(null);
	const [newTodo, setNewTodo] = useState<string>('');
	const [selectedDateIdx, setSelectedDateIdx] = useState<number>(day === 6 ? 0 : day);
	const [editContent, setEditContent] = useState<string>('');
	const calcWeek = () => {
		const { curMonthLastDate } = getCurMonthLastDayInfo(year, month);
		const { prevMonthLastDate, prevMonthLastDay } = getPrevMonthLastDayInfo(year, month);
		const DATE = date;
		const DAY = day; // 일요일 처리
		const res = [];
		console.log(DAY, day, 'DAy');
		for (let i = 0; i < DAY; i += 1) {
			console.log(i);
			if (DATE - (DAY - i) <= 0) {
				res.push(prevMonthLastDate - (prevMonthLastDay - i));
			} else res.push(DATE - (DAY - i));
		}
		res.push(DATE);
		for (let i = 1; i < 7 - DAY; i += 1) {
			if (DATE + i > curMonthLastDate) {
				res.push(DATE + i - curMonthLastDate);
			} else res.push(DATE + i);
		}
		return res;
	};
	const [week, setWeek] = useState<number[]>(calcWeek());

	const addTodoHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (postChecklistLoading) return;
		if (!newTodo.trim()) return;
		const body = {
			date: searchDate,
			content: newTodo,
			status: 'N' as 'Y' | 'N',
		};

		postChecklist(body);
		setNewTodo('');
	};
	const cancelAddTodoHandler = () => {
		setNewTodo('');
		setAddTodoInputOpen(false);
	};
	const todoCheckStateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: {
				checked,
				dataset: { checkidx, content },
			},
		} = e;
		if (putChecklistLoading) return;
		const body = {
			checkIdx: +(checkidx ?? -1) as number,
			content: content as string,
			status: (checked ? 'Y' : 'N') as 'Y' | 'N',
		};
		console.log(body);
		putChecklist(body);
	};
	const editTodoHandler = (status: 'N' | 'Y') => {
		const body = {
			checkIdx: editTodoInputOpenIdx as number,
			content: editContent as string,
			status: status as 'N' | 'Y',
		};
		putChecklist(body);
		// TODO: 엔터치고 이전 데이터 잠시 보이는 현상 해결하기
		setEditTodoInputOpenIdx(null);
		setEditContent('');
	};
	const deleteTodoHandler = () => {
		if (deleteChecklistLoading) return;
		deleteChecklist(editTodoInputOpenIdx as number);
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
		setSelectedDateIdx(weekidx);
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
	console.log(checklist);
	return (
		<>
			<Header title="내 할일 점검" />

			<main className="wrap mx-[-2rem]  overflow-y-hidden">
				<div className="space-y-[2rem] px-[2rem] pb-[1.2rem] top-[5.6rem] pt-[1.6rem] bg-w z-[100] sticky">
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
							{week.map((w, index) => (
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

				<div className="overflow-y-scroll overflow-x-hidden px-[2rem]  scrollbar-hidden mt-[5.6rem] relative">
					<Divider />
					{isChecklistFetched && isWorkDay ? (
						<div className=" text-subhead2 space-y-[1.6rem] pt-[2.4rem]  relative h-[100vh] ">
							<div className="w-full bg-white ">
								<button
									onClick={() => setAddTodoInputOpen(true)}
									aria-hidden={addTodoInputOpen}
									className="aria-hidden:hidden  flex items-center text-g7 space-x-[1rem]"
								>
									<AddTodoIcon />
									<span>항목 추가하기</span>
								</button>
								{addTodoInputOpen && (
									<form
										onSubmit={addTodoHandler}
										aria-hidden={!addTodoInputOpen}
										className="aria-hidden:hidden  flex items-center  space-x-[1rem]"
									>
										<div>
											<AddTodoDecoIcon />
										</div>
										<input
											type="text"
											enterKeyHint="done"
											name="addTodo"
											value={newTodo}
											autoComplete="off"
											autoCapitalize="off"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
											// eslint-disable-next-line jsx-a11y/no-autofocus
											autoFocus
											onBlur={() => setAddTodoInputOpen(false)}
											className="w-full  rounded-none outline-none border-b-[0.1rem] border-g6 text-g9"
										/>
										<button type="button" onClick={cancelAddTodoHandler}>
											<TrashIcon />
										</button>
									</form>
								)}
							</div>
							<ul className=" text-g9 space-y-[1.6rem] pb-[22.4rem] ">
								{checklist?.map((todo, index) => (
									<li key={todo.checkIdx ?? index} className="flex justify-between w-full ">
										<div className="space-x-[1rem] flex items-center w-full">
											<div>
												<input
													id={`checkbox-${todo.checkIdx}`}
													type="checkbox"
													data-checkidx={todo.checkIdx}
													data-content={todo.content}
													defaultChecked={todo.status === 'Y'}
													className="checklist-checkbox"
													onChange={todoCheckStateHandler}
												/>
												<label htmlFor={`checkbox-${todo.checkIdx}`} />
											</div>
											<div
												aria-hidden={editTodoInputOpenIdx === todo.checkIdx}
												className="aria-hidden:hidden flex items-center justify-between w-full"
											>
												<span className="mb-[0.4rem]">{todo.content}</span>
												<button onClick={() => setEditTodoInputOpenIdx(todo.checkIdx)}>
													<SettingIcon />
												</button>
											</div>
											{editTodoInputOpenIdx === todo.checkIdx && (
												<form
													onSubmit={(e: React.FormEvent) => {
														e.preventDefault();
														editTodoHandler(todo.status);
													}}
													aria-hidden={editTodoInputOpenIdx !== todo.checkIdx}
													className="aria-hidden:hidden flex items-center w-full space-x-[1rem]"
												>
													<input
														name="editTodo"
														onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditContent(e.target.value)}
														defaultValue={todo.content}
														autoComplete="off"
														autoCapitalize="off"
														// eslint-disable-next-line jsx-a11y/no-autofocus
														autoFocus
														type="text"
														enterKeyHint="done"
														onBlur={() => setEditTodoInputOpenIdx(null)}
														className="w-full outline-none rounded-none border-b-[0.1rem] border-g6 text-g9"
													/>
													<button type="button" onClick={deleteTodoHandler}>
														<TrashIcon />
													</button>
												</form>
											)}
										</div>
									</li>
								))}
							</ul>
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
/*



*/
