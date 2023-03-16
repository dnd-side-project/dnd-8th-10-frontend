import { useRouter } from 'next/router';
import React from 'react';
import Badge from 'src/app.components/app.base/Button/Badge';
import Header from 'src/app.components/Header';
import XIcon from 'src/app.modules/assets/mypage/x.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import EditIcon from 'src/app.modules/assets/edit.svg';
import useModal from 'src/app.modules/hooks/useModal';
import Overlay from 'src/app.components/Modal/Overlay';
import Modal from 'src/app.components/Modal/Modal';
import { IUser } from '../types';
import { getFormmatedWorkTime } from '../utils/getFormattedWorkTime';

interface Props {
	user: IUser;
	delelteUserMutate: any; // TODO:any 없애기
}

function ProfileSettingScreen({ user, delelteUserMutate }: Props) {
	const router = useRouter();
	const { isModalOpen, closeModal, openModal } = useModal();
	return (
		<>
			<Header title="회원정보 수정" />
			<main className="wrap pt-[7.6rem] text-g9 relative">
				<ul className="space-y-[2rem]">
					<li className="flex items-center  justify-between border-solid border-b-[0.1rem] border-g3 pb-[2rem]">
						<span className="text-subhead2">이름</span>
						<div className="text-body2">{user?.userName}</div>
					</li>
					<li className="flex items-center  justify-between border-solid border-b-[0.1rem] border-g3 pb-[2rem]">
						<span className="text-subhead2">근무지</span>
						<div className="text-body2">{user?.workPlace}</div>
					</li>
					<li className="flex items-start  justify-between border-solid border-b-[0.1rem] border-g3 pb-[2rem]">
						<span className="text-subhead2">근무시간</span>
						<ul className="text-body2 flex flex-col space-y-[1.2rem]">
							{user?.workTime.split(',').map((partTime, idx) => (
								<li key={`time-${idx}`}>
									<button onClick={() => router.push(SERVICE_URL.editWorkTime)}>
										<Badge size="small" color="warmGray">
											<div className="flex items-center space-x-[0.4rem]">
												<span className="text-body2">{getFormmatedWorkTime(partTime)}</span> <EditIcon />
											</div>
										</Badge>
									</button>
								</li>
							))}
						</ul>
					</li>
					<li className="flex items-center  justify-between border-solid border-b-[0.1rem] border-g3 pb-[2rem]">
						<span className="text-subhead2">개인연락처</span>
						<button className="text-body2" onClick={() => router.push(SERVICE_URL.editPhoneNumber)}>
							<Badge size="small" color="warmGray">
								<div className="flex items-center space-x-[0.4rem] text-body2">
									<span>{user?.phoneNumber}</span> <EditIcon />
								</div>
							</Badge>
						</button>
					</li>
					<li className="flex items-center  justify-between last:border-none  border-solid border-b-[0.1rem] border-g3 pb-[2rem]">
						<span className="text-subhead2">시급</span>
						<button className="text-body2" onClick={() => router.push(SERVICE_URL.editWage)}>
							<Badge size="small" color="warmGray">
								<div className="flex items-center space-x-[0.4rem] text-body2">
									<span>{user?.wage.toLocaleString()} 원</span> <EditIcon />
								</div>
							</Badge>
						</button>
					</li>
				</ul>
				<div className="absolute bottom-[2rem] right-0">
					<Badge color="white" size="large">
						<button onClick={openModal} className="text-g9 text-subhead2 px-[0.6rem]">
							탈퇴하기
						</button>
					</Badge>
				</div>
			</main>
			{isModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeModal();
					}}
				>
					<Modal
						title="정말 탈퇴하시는 건가요?"
						yesFn={() => delelteUserMutate()}
						yesTitle="탈퇴"
						noFn={closeModal}
						noTitle="아니오"
					/>
				</Overlay>
			)}
		</>
	);
}

export default ProfileSettingScreen;
