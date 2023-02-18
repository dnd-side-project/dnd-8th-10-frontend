import { useRouter } from 'next/router';
import React from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import { RoleType } from 'src/app.modules/api/user';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import IdCard from '../components/IdCard';

interface Props {
	userName: string;
	workPlace: string;
	role: RoleType | null;
}

function CompleteSettingScreent({ userName, workPlace, role }: Props) {
	const router = useRouter();
	return (
		<div className="flex flex-col items-center relative h-[100vh]">
			<h1 className="absolute top-[13rem] text-g10 text-title2">프로필이 완성되었어요!</h1>
			<IdCard role={role} userName={userName} workPlace={workPlace} />
			<div className="flex flex-col gap-[0.8rem] absolute bottom-[2rem] w-full items-center">
				<span className="text-g8 text-subhead1">개인정보 수정은 마이페이지에서 가능해요!</span>
				<Bar ClickFn={() => router.push(SERVICE_URL.home)} bgColor="bg-g10" titleColor="text-w">
					시작하기
				</Bar>
			</div>
		</div>
	);
}

export default CompleteSettingScreent;
