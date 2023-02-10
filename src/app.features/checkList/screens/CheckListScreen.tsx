import React, { useEffect, useState } from 'react';
import { PostCheckListBody, PutCheckListBody } from 'src/app.modules/api/checklist';
import { MutateTpye } from 'src/app.modules/api/client';
import SettingIcon from 'src/app.modules/assets/ellipsis.svg';

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
interface ICheckList {
	date: string; // '2023-02-09'
	checkIdx: number;
	content: string;
	status: 'Y' | 'N';
}
interface Props {
	searchDate: string;
	searchDateHandler: (searchYear: number, searchMonth: number, searchDay: number) => void;
	checklist: ICheckList[];
	postChecklist: MutateTpye<PostCheckListBody>;
	postChecklistLoading: boolean;
	putChecklist: MutateTpye<PutCheckListBody>;
	putChecklistLoading: boolean;
	deleteChecklist: MutateTpye<number>;
	deleteChecklistLoading: boolean;
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
}: Props) {
	console.log(checklist);
	const { year, month, date, day } = getKoreaToday();
	const [addTodoInputOpen, setAddTodoInputOpen] = useState<boolean>(false);
	const [editTodoInputOpenIdx, setEditTodoInputOpenIdx] = useState<number | null>(null);
	const [newTodo, setNewTodo] = useState<string>('');
	const calcWeek = () => {
		const { curMonthLastDate } = getCurMonthLastDayInfo(year, month);
		const { prevMonthLastDate, prevMonthLastDay } = getPrevMonthLastDayInfo(year, month);
		const DATE = date;
		const DAY = day === 6 ? 0 : day; // 일요일 처리
		const res = [];
		for (let i = 0; i < DAY; i += 1) {
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
	const editTodoHandler = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		if (putChecklistLoading) return;
		const {
			target: {
				editTodo: { value },
				dataset: { status },
			},
		} = e;

		const body = {
			checkIdx: editTodoInputOpenIdx as number,
			content: value as string,
			status: status as 'N' | 'Y',
		};
		putChecklist(body);
		// TODO: 엔터치고 이전 데이터 잠시 보이는 현상 해결하기
		setEditTodoInputOpenIdx(null);
	};
	const deleteTodoHandler = () => {
		if (deleteChecklistLoading) return;
		deleteChecklist(editTodoInputOpenIdx as number);
	};
	const untitledHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: {
				dataset: { weekidx },
				value: selecedDate,
			},
		} = e;
		const todayWeekIdx = day === 6 ? 0 : day;
		let searchMonth = month;
		let searchYear = year;
		if (selecedDate < date && todayWeekIdx < weekidx) {
			// 다음달로 넘어가는 경우
			if (month === 12) {
				searchMonth = 1;
				searchYear += 1;
			} else {
				searchMonth += 1;
			}
		}
		if (selecedDate > date && todayWeekIdx > weekidx) {
			// 이전달로 넘어가는 경우
			if (month === 1) {
				searchMonth = 12;
				searchYear -= 1;
			} else {
				searchMonth -= 1;
			}
		}
		console.log(searchYear, searchMonth, selecedDate);
		searchDateHandler(searchYear, searchMonth, selecedDate);
	};
	return (
		<div className="w-full">
			<div>
				<span>
					{year}년 {month}월
				</span>
				<ul className="grid grid-cols-7 text-center">
					{['일', '월', '화', '수', '목', '금', '토'].map((w) => (
						<li key={w}>{w}</li>
					))}
				</ul>
				<ul className="grid grid-cols-7 text-center">
					{week.map((w, index) => (
						<li key={index}>
							<button name="searchDate" value={w} data-weekidx={index} onClick={untitledHandler}>
								{w}
							</button>
						</li>
					))}
				</ul>
			</div>
			<div>
				<button onClick={() => setAddTodoInputOpen(true)} aria-hidden={addTodoInputOpen} className="aria-hidden:hidden">
					항목 추가하기
				</button>
				<form aria-hidden={!addTodoInputOpen} onSubmit={addTodoHandler} className="aria-hidden:hidden flex">
					<div>
						<input id="newtodo-checkbox" type="checkbox" className="checklist-checkbox" checked={false} readOnly />
						<label htmlFor="newtodo-checkbox" />
					</div>
					<input
						type="text"
						name="newTodo"
						value={newTodo}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
					/>
					<button type="button" onClick={cancelAddTodoHandler}>
						휴지통
					</button>
				</form>
				<ul>
					{checklist &&
						checklist.map((todo) => (
							<li key={todo.checkIdx} className="flex justify-between">
								<div className="space-x-[1rem] flex">
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
									<span aria-hidden={editTodoInputOpenIdx === todo.checkIdx} className="aria-hidden:hidden">
										{todo.content}
									</span>
									<form
										onSubmit={editTodoHandler}
										aria-hidden={editTodoInputOpenIdx !== todo.checkIdx}
										data-status={todo.status}
										className="aria-hidden:hidden"
									>
										<input type="text" name="editTodo" />
										<button type="button" name="deleteTodo" onClick={deleteTodoHandler}>
											휴지통
										</button>
									</form>
								</div>
								<button onClick={() => setEditTodoInputOpenIdx(todo.checkIdx)}>
									<SettingIcon />
								</button>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default CheckListScreen;
