import { useRouter } from 'next/router';
import React from 'react';
import Header from 'src/app.components/Header';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import useModal from 'src/app.modules/hooks/useModal';

interface Props {
	children?: React.ReactNode;
	title: string;
	isNeedAlert: boolean;
}
function InventoryHeader({ children, title, isNeedAlert }: Props) {
	const router = useRouter();

	const {
		isModalOpen: isBackAlertModalOpen,
		closeModal: closeBackAlertModal,
		openModal: openBackAlertModal,
	} = useModal();
	const goBackHandler = () => {
		if (isNeedAlert) {
			openBackAlertModal();
		} else router.back();
	};
	return (
		<>
			<Header title={title} onBack={goBackHandler}>
				{children}
			</Header>
			{isBackAlertModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeBackAlertModal();
					}}
				>
					<Modal
						iconView
						title="시재점검을 종료하시는건가요?"
						subTitle="점검 중인 내용이 저장되지 않습니다"
						yesFn={() => router.back()}
						yesTitle="종료"
						noFn={closeBackAlertModal}
						noTitle="아니오"
					/>
				</Overlay>
			)}
		</>
	);
}

export default InventoryHeader;
