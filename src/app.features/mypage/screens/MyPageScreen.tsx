import React from 'react';
import Divider from 'src/app.components/Divider';
import InfoBox from 'src/app.components/InfoBox';
import SettingIcon from 'src/app.modules/assets/mypage/setting.svg';
import StoreIcon from 'src/app.modules/assets/mypage/store.svg';
import LeftArrowIcon from 'src/app.modules/assets/mypage/arrowLeft.svg';
import { getSplittedWorkPlaceString } from 'src/app.modules/util/getSplittedWorkPlaceString';
import Profile from 'src/app.components/Profile';
import { useRouter } from 'next/router';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Navigation from 'src/app.components/Navigation';
import { IUser } from '../types';

interface Props {
	user: IUser;
	logoutHandler: () => void;
}
// TODO: 프로필이미지 캐싱 필요
function MyPageScreen({ user, logoutHandler }: Props) {
	const router = useRouter();

	return (
		<>
			<header className="flex items-center justify-between bg-white  h-[5.6rem] px-[2rem] fixed w-full max-w-[50rem] -translate-x-[2rem] mx-auto ">
				<h1 className="text-subhead4 text-g10 ">마이페이지</h1>
				<button onClick={() => router.push(SERVICE_URL.profileSetting)}>
					<SettingIcon />
				</button>
			</header>
			<main className="h-[100vh] pt-[7.2rem]">
				<div className="pb-[1.6rem] space-y-[1.6rem]">
					{user && <Profile {...user} />}
					<InfoBox>
						<button
							onClick={() => router.push(SERVICE_URL.myStore)}
							className="w-full h-full flex items-center justify-between"
						>
							<div className="flex items-center space-x-[0.8rem]">
								<StoreIcon />
								<span className="text-subhead1 text-g9">{getSplittedWorkPlaceString(user?.workPlace ?? '')}</span>
							</div>
							<LeftArrowIcon />
						</button>
					</InfoBox>
				</div>
				<Divider />
				<div className="py-[2.4rem]">
					<ul className=" space-y-[2rem]">
						<li className=" border-solid border-b-[0.1rem] pb-[2rem] border-g3 w-full flex flex-col space-y-[0.2rem] text-subhead2 text-g9">
							내가 쓴글
						</li>
						<li className=" border-solid border-b-[0.1rem] pb-[2rem] border-g3 w-full flex flex-col space-y-[0.2rem] text-subhead2 text-g9">
							문의하기
						</li>
						<li className="last:border-none border-solid border-b-[0.1rem] pb-[2rem] border-g3 w-full flex flex-col items-start space-y-[0.2rem] text-subhead2 text-g9 ">
							<button onClick={logoutHandler}>로그아웃</button>
						</li>
					</ul>
				</div>
			</main>
			<Navigation />
		</>
	);
}

export default MyPageScreen;
