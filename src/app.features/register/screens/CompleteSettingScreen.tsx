import React from 'react';
import { RoleType } from 'src/app.modules/api/user';
import IdCard from '../components/IdCard';

interface Props {
	userName: string;
	workPlace: string;
	role: RoleType | null;
}

function CompleteSettingScreent({ userName, workPlace, role }: Props) {
	return (
		<div className="flex flex-col items-center relative h-[100vh]">
			<h1 className="absolute top-[13rem] text-g10 text-title2">프로필이 완성되었어요!</h1>
			<IdCard role={role} userName={userName} workPlace={workPlace} />
			<div className="flex flex-col gap-[0.8rem] absolute bottom-[2rem]">
				<span className="text-g8 text-subhead1">개인정보 수정은 마이페이지에서 가능해요!</span>
				<button>시작하기</button>
			</div>
		</div>
	);
}

export default CompleteSettingScreent;
