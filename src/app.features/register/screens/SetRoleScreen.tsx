import React, { useEffect, useRef } from 'react';
import InActiveWorkerSvg from 'src/app.modules/assets/register/inactive_worker.svg';
import InActiveManagerSvg from 'src/app.modules/assets/register/inactive_manager.svg';
import workerJson from 'public/lottie/worker.json';
import managerJson from 'public/lottie/manager.json';
// eslint-disable-next-line import/no-extraneous-dependencies
import lottie from 'lottie-web';
import { IUser, RoleType } from 'src/app.modules/types/user';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';

function ActiveRoleJson({ userRole }: { userRole: IUser['role'] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const $container = containerRef.current;
		if ($container === null) return;
		lottie.loadAnimation({
			container: $container,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: userRole === 'WORKER' ? workerJson : managerJson,
		});
	}, []);
	return <div ref={containerRef} />;
}

interface Props {
	userName: string;
}

function SetRoleScreen({ userName }: Props) {
	const {
		userForm: { role },
		setRole,
	} = useRegisterUserStore();

	const roleHandler = (value: RoleType): void => {
		setRole(value);
	};

	return (
		<RegisterLayout
			curPage={1}
			canGoNext={Boolean(role)}
			guideMessage={`안녕하세요, ${userName}님\n어떤일을 하고 계신가요?`}
		>
			<div className=" flex flex-col items-center ">
				<div className="absolute grid grid-cols-2   gap-[1.6rem] mx-auto top-[38%]  max-w-[32rem] w-[calc(100vw-4rem)]  ">
					<button
						type="button"
						onClick={() => roleHandler('WORKER')}
						aria-pressed={role === 'WORKER'}
						value="WORKER"
						className="aria-pressed:text-g9 aria-pressed:text-subhead4 text-g7 text-body3 flex flex-col items-center space-y-[0.8rem]"
					>
						<div className="shadow-gray  rounded-[0.8rem] w-full   max-w-[15.2rem]">
							{role === 'WORKER' ? <ActiveRoleJson userRole="WORKER" /> : <InActiveWorkerSvg />}
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
						<div className="shadow-gray rounded-[0.8rem] w-full  max-w-[15.2rem]">
							{role === 'MANAGER' ? <ActiveRoleJson userRole="MANAGER" /> : <InActiveManagerSvg />}
						</div>
						<span>점장</span>
					</button>
				</div>
			</div>
		</RegisterLayout>
	);
}

export default SetRoleScreen;
