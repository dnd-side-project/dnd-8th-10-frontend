import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Header from 'src/app.components/Header';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import { MutateTpye } from 'src/app.modules/api/client';
import { PutInventoryBodyType } from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';
import InventoryCommonFlow from '../components/InventoryCommonFlow';
import { CountHistoryType, IInventory } from '../types';

interface Props {
	inventoryList: IInventory[];
	editInventory: MutateTpye<PutInventoryBodyType>;
	workTimeStatus: string;
}
function GiftcardInventoryScreen({ inventoryList, editInventory, workTimeStatus }: Props) {
	const router = useRouter();
	const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);
	const {
		isModalOpen: isBackAlertModalOpen,
		closeModal: closeBackAlertModal,
		openModal: openBackAlertModal,
	} = useModal();
	const goBackHandler = () => {
		// Object.keys(countHistory).length &&
		if (workTimeStatus !== 'error' && !isSaveBtnClicked) {
			openBackAlertModal();
		} else router.back();
	};

	const submitInventoryRecord = (countHistory: CountHistoryType) => {
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const category: IInventory['category'] = 'GIFTCARD';
		const body = { category, list };
		editInventory(body);
		setIsSaveBtnClicked(true);
	};

	return (
		<>
			<Header title="문화 상품권" onBack={goBackHandler} />

			<main className="pt-[7.2rem] space-y-[1.6rem] h-full  text-g9 relative">
				<InventoryCommonFlow
					inventoryList={inventoryList}
					workTimeStatus={workTimeStatus}
					onInventoryRecordSubmit={submitInventoryRecord}
				/>
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
