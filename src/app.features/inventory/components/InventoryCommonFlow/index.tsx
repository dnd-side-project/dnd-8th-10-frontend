import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import Modal from 'src/app.components/Modal/Modal';
import Overlay from 'src/app.components/Modal/Overlay';
import useModal from 'src/app.modules/hooks/useModal';
import useCountHistory from '../../hooks/useCountHistory';
import { CountHistoryType, IInventory } from '../../types';
import InventoryList from '../InventoryList';
import LastCheckModal from '../LastCheckModal';

interface Props {
	inventoryList: IInventory[];
	workTimeStatus: string;
	onInventoryRecordSubmit: (countHistory: CountHistoryType) => void;
}
function InventoryCommonFlow({ inventoryList, workTimeStatus, onInventoryRecordSubmit }: Props) {
	const router = useRouter();
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);
	const { isModalOpen, closeAnimationModal: closeModal, openModal } = useModal();

	const {
		isModalOpen: isNotWorkTimeModalOpen,
		closeModal: closeNotWorkTimeModal,
		openModal: openNotWorkTimeModal,
	} = useModal();

	useEffect(() => {
		if (workTimeStatus === undefined) return;
		if (workTimeStatus === 'error') openNotWorkTimeModal();
	}, [workTimeStatus]);

	return (
		<>
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
						onInventoryRecordSubmit(countHistory);
						openModal();
					}}
				>
					점검사항 저장
				</Bar>
			</div>
			{isModalOpen && <LastCheckModal closeModal={closeModal} countHistory={countHistory} category="giftcard" />}
			{isNotWorkTimeModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeNotWorkTimeModal();
					}}
				>
					<Modal
						iconView
						title="근무시간이 아닙니다."
						subTitle="점검 중인 내용이저장되지 않습니다."
						yesFn={() => router.back()}
						yesTitle="종료"
						noFn={closeNotWorkTimeModal}
						noTitle="확인"
					/>
				</Overlay>
			)}
		</>
	);
}

export default InventoryCommonFlow;
