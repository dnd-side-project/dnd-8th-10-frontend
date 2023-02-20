import React from 'react';
import Divider from 'src/app.components/Divider';
import InfoBox from 'src/app.components/InfoBox';
import ProfileImage from 'src/app.components/ProfileImage';
import SettingIcon from 'src/app.modules/assets/mypage/setting.svg';
import { getSplittedWorkPlaceString } from 'src/app.modules/util/getSplittedWorkPlaceString';

interface IUser {
	userName: string;
	userProfileCode: number;
	workPlace: string; // 'GS25 영통럭키점'
	workTime: string; // '월(01:00~03:00),일(01:00~03:00)'
}

interface Props {
	user: IUser;
}

function MyPageScreen({ user }: Props) {
	return (
		<>
			<header className="flex items-center justify-between bg-white  h-[5.6rem] px-[2rem] fixed w-full max-w-[42rem] -translate-x-[2rem] mx-auto ">
				<h1 className="text-subhead4 text-g10 ">마이페이지</h1>
				<button>
					<SettingIcon />
				</button>
			</header>
			<main className="h-[100vh] pt-[7.2rem]">
				<div>
					<InfoBox>{getSplittedWorkPlaceString(user?.workPlace ?? '')}</InfoBox>
				</div>
				<Divider />
				<div>
					<ul />
				</div>
			</main>
		</>
	);
}

export default MyPageScreen;
