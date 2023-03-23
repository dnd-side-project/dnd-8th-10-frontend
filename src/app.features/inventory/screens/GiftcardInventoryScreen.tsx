import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import Header from 'src/app.components/Header';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import { MutateTpye } from 'src/app.modules/api/client';
import { IInventoryList, PutInventoryBody } from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';
import InventoryList from '../components/InventoryList';
import LastCheckModal from '../components/LastCheckModal';
import useCountHistory from '../hooks/useCountHistory';

interface Props {
	inventoryList: IInventoryList[];
	editInventory: MutateTpye<PutInventoryBody>;
	editInventoryLoading: boolean;
}
function GiftcardInventoryScreen({ inventoryList, editInventory, editInventoryLoading }: Props) {
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);
	const { isModalOpen, closeAnimationModal: closeModal, openModal } = useModal();
	const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
	const {
		isModalOpen: isBackAlertModalOpen,
		closeModal: closeBackAlertModal,
		openModal: openBackAlertModal,
	} = useModal();
	const router = useRouter();
	const goBackHandler = () => {
		if (Object.keys(countHistory).length && !isSaveBtnClicked) {
			openBackAlertModal();
		} else router.back();
	};
	const submitInventoryRecord = (category: string) => {
		if (editInventoryLoading) return;
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const body = { category, list };
		editInventory(body);
		setIsSaveBtnClicked(true);
	};
	return (
		<>
			<Header title="문화 상품권" onBack={goBackHandler} />

			<main className=" space-y-[1.6rem]  text-g9 relative">
				<div className="mt-[7.2rem]" />
				{inventoryList && (
					<InventoryList
						inventoryList={inventoryList}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
					/>
				)}
				<div
					className="fixed bottom-[2rem]  w-screen -translate-x-[2rem] max-w-[50rem] px-[2rem] ciga-save-shadow  rounded-[0.8rem]  "
					aria-hidden={isModalOpen}
				>
					<Bar
						ClickFn={() => {
							submitInventoryRecord('giftcard');
							openModal();
						}}
					>
						점검사항 저장
					</Bar>
				</div>
				{isModalOpen && <LastCheckModal closeModal={closeModal} countHistory={countHistory} category="giftcard" />}
			</main>
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

export default GiftcardInventoryScreen;
