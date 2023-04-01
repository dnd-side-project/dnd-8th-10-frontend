import React, { useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { PutInventoryBodyType } from 'src/app.modules/api/inventory';
import InventorySave from '../components/InventoryCommonFlow/InventorySave';
import WorkTimeStatusModal from '../components/InventoryCommonFlow/WorkTimeStatusModal';
import InventoryHeader from '../components/InventoryHeader';
import InventoryList from '../components/InventoryList';
import useCountHistory from '../hooks/useCountHistory';
import { IInventory } from '../types';

interface Props {
	inventoryList: IInventory[];
	editInventory: MutateTpye<PutInventoryBodyType>;
	workTimeStatus: string;
}
function GiftcardInventoryScreen({ inventoryList, editInventory, workTimeStatus }: Props) {
	const { countHistory, changeDiffHandler, isModified } = useCountHistory(inventoryList);
	const submitInventoryRecordHandler = () => {
		const list = Object.keys(countHistory).map((inventoryName) => ({
			inventoryName,
			diff: countHistory[inventoryName],
		}));
		const category: IInventory['category'] = 'GIFTCARD';
		const body = { category, list };
		editInventory(body);
	};

	return (
		<>
			<WorkTimeStatusModal workTimeStatus={workTimeStatus} />
			<InventoryHeader title="문화 상품권" isNeedAlert={isModified} />

			<main className="pt-[7.2rem] space-y-[1.6rem] h-full  text-g9 relative">
				{inventoryList && (
					<InventoryList
						inventoryList={inventoryList}
						countHistory={countHistory}
						changeDiffHandler={changeDiffHandler}
					/>
				)}
				<InventorySave countHistory={countHistory} onInventoryRecordSubmit={submitInventoryRecordHandler} />
			</main>
		</>
	);
}

export default GiftcardInventoryScreen;
