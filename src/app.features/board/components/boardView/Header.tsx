import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BackIcon from 'src/app.modules/assets/back.svg';
import MoreIcon from 'src/app.modules/assets/more.svg';
import Overlay from 'src/app.components/Modal/Overlay';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Modal from 'src/app.components/Modal/Modal';
import BoardModal from 'src/app.components/Modal/BoardModal';
import { MutateTpye } from 'src/app.modules/api/client';
import useModal from 'src/app.modules/hooks/useModal';

interface Props {
	DelMutate: MutateTpye<number>;
	postId: number | null;
	myPost: boolean;
}

function Header({ postId, DelMutate, myPost }: Props) {
	const { isModalOpen, closeModal, openModal } = useModal();
	const router = useRouter();
	const [delModalView, setDelModalView] = useState<boolean>(false);
	const delMutateHandler = () => {
		if (postId) {
			DelMutate(postId);
		}
	};

	return (
		<>
			<header className="w-full h-[5.6rem] flex items-center justify-between mb-[1.6rem]">
				<button type="button" onClick={() => router.back()}>
					<BackIcon stroke="#66666E" />
				</button>
				{myPost && (
					<button type="button" onClick={openModal}>
						<MoreIcon />
					</button>
				)}
			</header>
			{isModalOpen && (
				<Overlay overlayClickFn={closeModal}>
					{delModalView ? (
						<Modal
							title="삭제하시겠습니까?"
							yesFn={delMutateHandler}
							yesTitle="삭제"
							noFn={() => {
								setDelModalView(false);
								openModal();
							}}
							noTitle="아니오"
						/>
					) : (
						<BoardModal
							yesFn={() => {
								router.push(`${SERVICE_URL.boardEdit}/${postId}`);
							}}
							noFn={() => setDelModalView(true)}
							cancelFn={closeModal}
						/>
					)}
				</Overlay>
			)}
		</>
	);
}

export default Header;
