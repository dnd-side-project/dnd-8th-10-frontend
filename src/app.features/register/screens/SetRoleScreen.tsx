import React from 'react';
import ActiveWorkerSvg from 'src/app.modules/assets/register/active_worker.svg';
import ActiveManagerSvg from 'src/app.modules/assets/register/active_manager.svg';
import InActiveWorkerSvg from 'src/app.modules/assets/register/inactive_worker.svg';
import InActiveManagerSvg from 'src/app.modules/assets/register/inactive_manager.svg';
import { RoleType } from 'src/app.modules/api/user';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

interface Props {
	userName: string;
}

function SetRoleScreen({ userName }: Props) {
	const {
		user: { role },
		setRole,
	} = useRegisterUserStore();

	const roleHandler = (value: RoleType) => {
		setRole(value);
	};
	// TODO: 화면크기별로 버튼 간격 대응하기
	return (
		<RegisterLayout curPage={1} canGoNext={role !== null}>
			<div className="space-y-[11.4rem] ">
				<h1 className="text-g10 text-title2">
					안녕하세요, {userName}님
					<br />
					어떤일을 하고 계신가요?
				</h1>
				<div className="flex  w-full mx-auto justify-between max-w-[34rem]">
					<button
						type="button"
						onClick={() => roleHandler('WORKER')}
						aria-pressed={role === 'WORKER'}
						value="WORKER"
						className="aria-pressed:text-g9 text-g8 text-subhead2 flex flex-col items-center space-y-[0.8rem]"
					>
						<div className="shadow-gray">{role === 'WORKER' ? <ActiveWorkerSvg /> : <InActiveWorkerSvg />}</div>
						<span>알바생</span>
					</button>

					<button
						type="button"
						onClick={() => roleHandler('MANAGER')}
						aria-pressed={role === 'MANAGER'}
						value="MANAGER"
						className="aria-pressed:text-g9 text-g8 text-subhead2 flex flex-col items-center space-y-[0.8rem]"
					>
						<div className=" shadow-gray ">{role === 'MANAGER' ? <ActiveManagerSvg /> : <InActiveManagerSvg />}</div>
						<span>점장</span>
					</button>
				</div>
			</div>
		</RegisterLayout>
	);
}

export default SetRoleScreen;
