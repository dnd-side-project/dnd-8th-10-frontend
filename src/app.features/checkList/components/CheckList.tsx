import React, { useState } from 'react';
import SettingIcon from 'src/app.modules/assets/checklist/ellipsis.svg';
import { ICheckList } from '../types';

import TodoForm from './TodoForm';

interface Props {
	checklist: ICheckList[];
	onEditTodo: (checkIdx: number, content: string, status: ICheckList['status']) => void;
	onDeleteTodo: (checkIdx: number) => void;
	onCheckTodo: (checkIdx: number, isChecked: boolean, content: string) => void;
}
function CheckList({ checklist, onEditTodo, onDeleteTodo, onCheckTodo }: Props) {
	const [editTodoInputOpenIdx, setEditTodoInputOpenIdx] = useState<number | null>(null);
	return (
		<ul className=" text-g9 space-y-[1.6rem]  ">
			{checklist?.map((todo, index) => (
				<li key={todo.checkIdx ?? index} className="flex justify-between w-full ">
					<div className="space-x-[1rem] flex items-center w-full">
						<div>
							<input
								id={`checkbox-${todo.checkIdx}`}
								type="checkbox"
								defaultChecked={todo.status === 'Y'}
								className="checklist-checkbox"
								onChange={(e) => onCheckTodo(todo.checkIdx, e.target.checked, todo.content)}
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
								onSubmit={(modTodo: string) => {
									onEditTodo(todo.checkIdx, modTodo, todo.status);
									setEditTodoInputOpenIdx(null);
								}}
								isHidden={editTodoInputOpenIdx !== todo.checkIdx}
								onBlur={() => setEditTodoInputOpenIdx(null)}
								onTrashClick={() => onDeleteTodo(todo.checkIdx)}
								defaultValue={todo.content}
							/>
						)}
					</div>
				</li>
			))}
		</ul>
	);
}

export default CheckList;
