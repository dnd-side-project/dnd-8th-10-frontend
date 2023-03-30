/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import Header from 'src/app.components/Header';
import { MutateTpye } from 'src/app.modules/api/client';
import SettingIcon from 'src/app.modules/assets/checklist/ellipsis.svg';
import EmptyGraphic from 'src/app.modules/assets/checklist/emptyGraphic.svg';
import AddTodoIcon from 'src/app.modules/assets/checklist/addTodo.svg';
import AddTodoDecoIcon from 'src/app.modules/assets/checklist/addInputDeco.svg';
import { formatDate } from 'src/app.modules/util/formatDate';
import Divider from 'src/app.components/Divider';
import { getCookie } from 'src/app.modules/cookie';
import { COOKIE_KEY } from 'src/app.modules/constants/Cookie';
import { PostCheckListBodyType, PutCheckListBodyType } from 'src/app.modules/api/checklist';
import { ICheckList } from '../\btypes';
import { getWeekDateList } from '../utils/getWeekDateList';
import { getKoreaTodayDateInfo } from '../utils/getKoreaTodayDateInfo';
import NewbieGuide from '../components/NewbieGuide';
import TodoForm from '../components/TodoForm';

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
	const [addTodoInputOpen, setAddTodoInputOpen] = useState<boolean>(false);
	const [editTodoInputOpenIdx, setEditTodoInputOpenIdx] = useState<number | null>(null);

	const addTodoHandler = (newTodo: string) => {
		if (postChecklistLoading) return;
		if (!newTodo.trim()) return;
		const body = {
			date: searchDate,
			content: newTodo,
			status: 'N' as 'Y' | 'N',
		};

		postChecklist(body);
	};
	const cancelAddTodoHandler = () => {
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
	const editTodoHandler = (content: string, status: ICheckList['status']) => {
		const body = {
			checkIdx: editTodoInputOpenIdx as number,
			content,
			status,
		};
		putChecklist(body);
		// TODO: 엔터치고 이전 데이터 잠시 보이는 현상 해결하기
		setEditTodoInputOpenIdx(null);
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
									<div className="flex items-center space-x-[1rem]">
										<div>
											<AddTodoDecoIcon />
										</div>
										<TodoForm
											onSubmit={addTodoHandler}
											isHidden={!addTodoInputOpen}
											onBlur={() => setAddTodoInputOpen(false)}
											onTrashClick={cancelAddTodoHandler}
										/>
									</div>
								)}
							</div>
							<ul className=" text-g9 space-y-[1.6rem]  ">
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
												<TodoForm
													onSubmit={(modTodo: string) => editTodoHandler(modTodo, todo.status)}
													isHidden={editTodoInputOpenIdx !== todo.checkIdx}
													onBlur={() => setEditTodoInputOpenIdx(null)}
													onTrashClick={deleteTodoHandler}
													defaultValue={todo.content}
												/>
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
