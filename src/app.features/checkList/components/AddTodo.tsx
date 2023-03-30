import React, { useState } from 'react';
import AddTodoDecoIcon from 'src/app.modules/assets/checklist/addInputDeco.svg';
import AddTodoIcon from 'src/app.modules/assets/checklist/addTodo.svg';
import TodoForm from './TodoForm';

interface Props {
	onAddTodo: (newTodo: string) => void;
}

function AddTodo({ onAddTodo }: Props) {
	const [addTodoInputOpen, setAddTodoInputOpen] = useState<boolean>(false);
	const cancelAddTodoHandler = () => {
		setAddTodoInputOpen(false);
	};
	return (
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
						onSubmit={onAddTodo}
						isHidden={!addTodoInputOpen}
						onBlur={cancelAddTodoHandler}
						onTrashClick={cancelAddTodoHandler}
					/>
				</div>
			)}
		</div>
	);
}

export default AddTodo;
