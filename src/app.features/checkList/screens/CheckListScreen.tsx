import React, { useState } from 'react';
import { PostCheckListBody } from 'src/app.modules/api/checklist';
import { MutateTpye } from 'src/app.modules/api/client';

interface ICheckList {
	date: string; // '2023-02-09'
	checkIdx: number;
	content: string;
	status: 'Y' | 'N';
}
interface Props {
	searchDate: string;
	searchDateHandler: (searchYear: number, searchMonth: number, searchDay: number) => void;
	checkList: ICheckList[];
	postChecklist: MutateTpye<PostCheckListBody>;
	postChecklistLoading: boolean;
}
function CheckListScreen({ searchDate, searchDateHandler, checkList, postChecklist, postChecklistLoading }: Props) {
	const [addTodoInputOpen, setAddTodoInputOpen] = useState<boolean>(false);
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
	};
	const cancelAddTodoHandler = () => {
		setNewTodo('');
		setAddTodoInputOpen(false);
	};
	return (
		<div className="w-full">
			<div>
				<button onClick={() => setAddTodoInputOpen(true)} aria-hidden={addTodoInputOpen} className="aria-hidden:hidden">
					항목 추가하기
				</button>
				<form aria-hidden={!addTodoInputOpen} onSubmit={addTodoHandler} className="aria-hidden:hidden">
					<button type="button" className="w-[2rem] h-[2rem]">
						a
					</button>
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
					{checkList &&
						checkList.map((todo) => (
							<li key={todo.checkIdx} className="flex justify-between">
								<div className="space-x-[1rem]">
									<button className="w-[2rem] h-[2rem]">a</button>
									<span>{todo.content}</span>
								</div>
								<button>...</button>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}

export default CheckListScreen;
