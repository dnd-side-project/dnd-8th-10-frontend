import React, { useEffect } from 'react';
import ActiveWorkerSvg from 'src/app.modules/assets/register/active_worker.svg';
import ActiveManagerSvg from 'src/app.modules/assets/register/active_manager.svg';
import InActiveWorkerSvg from 'src/app.modules/assets/register/inactive_worker.svg';
import InActiveManagerSvg from 'src/app.modules/assets/register/inactive_manager.svg';
import { RoleType } from 'src/app.modules/api/user';
import workerJson from 'public/lottie/worker.json';
import managerJson from 'public/lottie/manager.json';
// eslint-disable-next-line import/no-extraneous-dependencies
import lottie from 'lottie-web';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

function Jsontest1() {
	useEffect(() => {
		const container = document.querySelector('#container');
		if (!container) return;
		lottie.loadAnimation({
			container,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: workerJson,
		});
	}, []);
	return <div id="container" />;
}

function Jsontest2() {
	useEffect(() => {
		const container = document.querySelector('#container2');
		if (!container) return;
		lottie.loadAnimation({
			container,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: managerJson,
		});
	}, []);
	return <div id="container2" />;
}
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
	// TODO: 역할선택버튼 간격 최대 1.2 rem 으로
	return (
		<RegisterLayout curPage={1} canGoNext={role !== null}>
			<div className="space-y-[11.4rem] flex flex-col items-center ">
				<h1 className="text-g10 text-title2 w-full text-start">
					안녕하세요, {userName}님
					<br />
					어떤일을 하고 계신가요?
				</h1>

				<div className="fixed flex  justify-between mx-auto  max-w-[32rem] w-[calc(100vw-4rem)] top-[20vh] ">
					<button
						type="button"
						onClick={() => roleHandler('WORKER')}
						aria-pressed={role === 'WORKER'}
						value="WORKER"
						className="aria-pressed:text-g9 aria-pressed:text-subhead4 text-g7 text-body3 flex flex-col items-center space-y-[0.8rem]"
					>
						<div className="shadow-gray  rounded-[0.8rem] max-w-[15.2rem]">
							{role === 'WORKER' ? <Jsontest1 /> : <InActiveWorkerSvg />}
						</div>
						<span>알바생</span>
					</button>
					<button
						type="button"
						onClick={() => roleHandler('MANAGER')}
						aria-pressed={role === 'MANAGER'}
						value="MANAGER"
						className="aria-pressed:text-g9 aria-pressed:text-subhead4 text-g7 text-body3 flex flex-col items-center space-y-[0.8rem]"
					>
						<div className="shadow-gray rounded-[0.8rem]  max-w-[15.2rem]">
							{role === 'MANAGER' ? <Jsontest2 /> : <InActiveManagerSvg />}
						</div>
						<span>점장</span>
					</button>
				</div>
			</div>
		</RegisterLayout>
	);
}

export default SetRoleScreen;
