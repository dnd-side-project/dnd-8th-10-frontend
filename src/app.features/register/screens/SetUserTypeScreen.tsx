import Link from 'next/link';
import React from 'react';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useRegisterUserStore from '../store';

function UserTypeScreen() {
	const {
		user: { role },
		setRole,
	} = useRegisterUserStore();
	// TODO: any
	const typeHandler = (e: React.BaseSyntheticEvent) => {
		// console.log(e.target.value);
		setRole(e.target.value);
		console.log(role);
	};

	return (
		<div>
			<div className="flex w-full space-x-2">
				<button
					type="button"
					onClick={typeHandler}
					aria-pressed={role === 'WORKER'}
					value="WORKER"
					className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
				>
					직원
				</button>

				<button
					type="button"
					onClick={typeHandler}
					aria-pressed={role === 'MANAGER'}
					value="MANAGER"
					className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
				>
					점장
				</button>
			</div>
			<Link href={`${SERVICE_URL.register}?page=2`}>다음으로</Link>
		</div>
	);
}

export default UserTypeScreen;
