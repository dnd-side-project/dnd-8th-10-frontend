import React from 'react';
import useRegisterUserStore from '../store';

function UserTypeScreen() {
	const {
		user: { type },
		setType,
	} = useRegisterUserStore();

	const typeHandler = (e: any) => {
		setType(e.target.value);
	};

	return (
		<div className="flex w-full space-x-2">
			<button
				type="button"
				onClick={typeHandler}
				aria-pressed={type === 'employee'}
				value="employee"
				className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
			>
				직원
			</button>

			<button
				type="button"
				onClick={typeHandler}
				aria-pressed={type === 'employer'}
				value="employer"
				className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
			>
				점장
			</button>
		</div>
	);
}

export default UserTypeScreen;
