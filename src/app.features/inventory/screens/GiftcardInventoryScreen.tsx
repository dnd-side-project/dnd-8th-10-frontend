import React, { useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import Header from 'src/app.components/Header';
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
	const submitInventoryRecord = (category: string) => {
		if (editInventoryLoading) return;
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const body = { category, list };
		editInventory(body);
	};
	return (
		<>
			<Header title="문화 상품권" />

			<main className="  pt-[7.2rem] h-[100vh] text-g9 relative overflow-hidden">
				{inventoryList && (
					<InventoryList
						inventoryList={inventoryList}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
					/>
				)}
				<div
					className="absolute bottom-0 pb-[2rem] pt-[8.8rem]  w-full fill-linear-gradient   "
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
		</>
	);
}

export default GiftcardInventoryScreen;
