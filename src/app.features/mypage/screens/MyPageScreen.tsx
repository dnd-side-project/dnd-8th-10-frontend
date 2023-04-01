import React from 'react';
import Divider from 'src/app.components/Divider';
import InfoBox from 'src/app.components/InfoBox';
import SettingIcon from 'src/app.modules/assets/mypage/setting.svg';
import StoreIcon from 'src/app.modules/assets/mypage/store.svg';
import LeftArrowIcon from 'src/app.modules/assets/mypage/arrowLeft.svg';
import { getBrandAndBranchString } from 'src/app.modules/util/getBrandAndBranchString';
import Profile from 'src/app.components/Profile';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Navigation from 'src/app.components/Navigation';
import useModal from 'src/app.modules/hooks/useModal';
import Overlay from 'src/app.components/Modal/Overlay';
import Modal from 'src/app.components/Modal/Modal';
import Link from 'next/link';
import { IUser } from 'src/app.modules/types/user';

interface Props {
	user: IUser;
	logoutHandler: () => void;
}
// TODO: 프로필이미지 캐싱 필요
function MyPageScreen({ user, logoutHandler }: Props) {
	const { isModalOpen, closeModal, openModal } = useModal();
	return (
		<>
			<header className="flex items-center justify-between bg-white  h-[5.6rem] px-[2rem] fixed w-full max-w-[50rem] -translate-x-[2rem] mx-auto ">
				<h1 className="text-subhead4 text-g10 ">마이페이지</h1>
				<Link title="회원정보 수정 바로가기" href={SERVICE_URL.profileSetting}>
					<SettingIcon />
				</Link>
			</header>
			<main className=" py-[7.2rem]  ">
				<div className="pb-[1.6rem] space-y-[1.6rem]">
					{user && <Profile {...user} />}
					<InfoBox>
						<Link
							href={SERVICE_URL.myStore}
							aria-label="편의점 정보 조회 바로가기"
							className="w-full h-full flex items-center justify-between"
						>
							<div aria-hidden className="flex items-center space-x-[0.8rem]">
								<StoreIcon />
								<span className="text-subhead1 text-g9">{getBrandAndBranchString(user?.workPlace ?? '')}</span>
							</div>
							<LeftArrowIcon />
						</Link>
					</InfoBox>
				</div>
				<Divider />
				<div className="py-[2.4rem]">
					<div className=" space-y-[2rem]">
						<div className=" border-solid border-b-[0.1rem] pb-[2rem] border-g3 w-full flex flex-col space-y-[0.2rem] text-subhead2 text-g9">
							<Link href={SERVICE_URL.mypost}>내가 쓴글</Link>
						</div>
						<div className=" border-solid border-b-[0.1rem] pb-[2rem] border-g3 w-full flex flex-col space-y-[0.2rem] text-subhead2 text-g9">
							문의하기
						</div>
						<div className="last:border-none border-solid border-b-[0.1rem] pb-[2rem] border-g3 w-full flex flex-col items-start space-y-[0.2rem] text-subhead2 text-g9 ">
							<button onClick={openModal}>로그아웃</button>
						</div>
					</div>
				</div>
			</main>
			{isModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeModal();
					}}
				>
					<Modal
						title="로그아웃하시는 건가요?"
						yesFn={logoutHandler}
						yesTitle="로그아웃"
						noFn={closeModal}
						noTitle="아니오"
					/>
				</Overlay>
			)}
			<Navigation />
		</>
	);
}

export default MyPageScreen;
