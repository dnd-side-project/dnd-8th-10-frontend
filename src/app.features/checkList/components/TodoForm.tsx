import React, { useState } from 'react';
import TrashIcon from 'src/app.modules/assets/checklist/trash.svg';

interface Props {
	onSubmit: (todo: string) => void;
	isHidden: boolean;
	onBlur: () => void;
	onTrashClick: () => void;
	defaultValue?: string;
}
// TODO: 휴지통 버튼 클릭 감지 못하는 이슈 처리하기
function TodoForm({ onSubmit, isHidden, onBlur, onTrashClick, defaultValue = '' }: Props) {
	const [todo, setTodo] = useState<string>(defaultValue);
	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(todo);
		setTodo('');
	};
	return (
		<form
			onSubmit={submitHandler}
			aria-hidden={isHidden}
			className="aria-hidden:hidden  flex items-center w-full space-x-[1rem]"
		>
			<input
				type="text"
				enterKeyHint="done"
				name="todo"
				autoComplete="off"
				autoCapitalize="off"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
				// eslint-disable-next-line jsx-a11y/no-autofocus
				autoFocus
				onBlur={onBlur}
				className="w-full  rounded-none outline-none border-b-[0.1rem] border-g6 text-g9"
			/>
			<button type="button" onMouseDown={onTrashClick}>
				<TrashIcon />
			</button>
		</form>
	);
}

export default TodoForm;
