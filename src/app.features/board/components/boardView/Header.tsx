import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import BackIcon from 'src/app.modules/assets/back.svg';
import MoreIcon from 'src/app.modules/assets/more.svg';
import Overlay from 'src/app.components/Modal/Overlay';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useModalStore from 'src/app.modules/store/modal';
import Modal from 'src/app.components/Modal/Modal';
import BoardModal from 'src/app.components/Modal/BoardModal';
import { MutateTpye } from 'src/app.modules/api/client';

interface Props {
	DelMutate: MutateTpye<number>;
	postId: number | null;
}

function Header({ postId, DelMutate }: Props) {
	const { isModalOpen, modalIsOpen, modalIsClose } = useModalStore();
	const router = useRouter();
	const [delModalView, setDelModalView] = useState<boolean>(false);
	const delMutateHandler = () => {
		if (postId === null) return;
		DelMutate(postId);
	};
	useEffect(() => {
		setDelModalView(false);
	}, [isModalOpen]);
	return (
		<>
			<header className="w-full h-[5.6rem] flex items-center justify-between mb-[1.6rem]">
				<button type="button" onClick={() => router.back()}>
					<BackIcon stroke="#66666E" />
				</button>
				<button type="button" onClick={modalIsOpen}>
					<MoreIcon />
				</button>
			</header>
			{isModalOpen && (
				<Overlay>
					{delModalView ? (
						<Modal title="삭제하시겠습니까?" yesFn={delMutateHandler} yesTitle="삭제" noBtn noTitle="아니오" />
					) : (
						<BoardModal
							yesFn={() => {
								router.push(`${SERVICE_URL.boardEdit}/${postId}`);
							}}
							noFn={() => setDelModalView(true)}
						/>
					)}
				</Overlay>
			)}
		</>
	);
}

export default Header;
