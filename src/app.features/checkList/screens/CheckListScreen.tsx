import React, { useState } from 'react';
import { PostCheckListBody, PutCheckListBody } from 'src/app.modules/api/checklist';
import { MutateTpye } from 'src/app.modules/api/client';
import SettingIcon from 'src/app.modules/assets/ellipsis.svg';

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
}
function CheckListScreen({
	searchDate,
	searchDateHandler,
	checklist,
	postChecklist,
	postChecklistLoading,
	putChecklist,
	putChecklistLoading,
}: Props) {
	console.log(checklist);
	const [addTodoInputOpen, setAddTodoInputOpen] = useState<boolean>(false);
	const [editTodoInputOpenIdx, setEditTodoInputOpenIdx] = useState<number | null>(null);
	const [newTodo, setNewTodo] = useState<string>('');
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
		const {
			target: {
				editTodo: { value },
			},
		} = e;
		// status: (checked ? 'Y' : 'N') as 'Y' | 'N',
		const body = {
			checkIdx: editTodoInputOpenIdx,
			content: value,
		};
	};
	const deleteTodoHandler = () => {
		console.log('temp');
	};
	return (
		<div className="w-full">
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
						취소
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
										className="aria-hidden:hidden"
									>
										<input type="text" name="editTodo" />
										<button type="button" onClick={deleteTodoHandler}>
											취소
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
