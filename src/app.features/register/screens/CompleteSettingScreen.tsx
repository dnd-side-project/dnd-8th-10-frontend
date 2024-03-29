import { useRouter } from 'next/router';
import React from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { RoleType } from 'src/app.modules/types/user';
import IdCard from '../components/IdCard';
import useRegisterUserStore from '../store';

interface Props {
	userName: string;
	role: RoleType;
	workPlace: string;
}

function CompleteSettingScreent({ userName, role, workPlace }: Props) {
	const router = useRouter();
	const {
		userForm: { role: clientRole, workPlace: clientWorkPlace },
		initUserForm,
	} = useRegisterUserStore();
	const startHandler = (): void => {
		router.push(SERVICE_URL.home);
		initUserForm();
	};
	return (
		<div className=" h-full flex flex-col items-center relative  ">
			{role === 'MANAGER' && <img alt="" src="/images/register/effect_manager.gif" className="inset-0 fixed mx-auto" />}
			{role === 'WORKER' && <img alt="" src="/images/register/effect_worker.gif" className="inset-0 fixed mx-auto" />}
			<h1 className="absolute top-[13rem] text-g10 text-title2">프로필이 완성되었어요!</h1>
			<IdCard role={role ?? clientRole} userName={userName} workPlace={workPlace ?? (clientWorkPlace as string)} />
			<div className="flex flex-col gap-[0.8rem] mt-[2rem] absolute bottom-[2rem] w-full items-center">
				<span className="text-g8 text-subhead1">개인정보 수정은 마이페이지에서 가능해요!</span>
				<Bar ClickFn={startHandler} bgColor="bg-g10" titleColor="text-w">
					시작하기
				</Bar>
			</div>
		</div>
	);
}

export default CompleteSettingScreent;
