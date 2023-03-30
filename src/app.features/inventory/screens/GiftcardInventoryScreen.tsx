import React, { useState } from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { PutInventoryBodyType } from 'src/app.modules/api/inventory';
import InventoryCommonFlow from '../components/InventoryCommonFlow';
import InventoryHeader from '../components/InventoryHeader';
import { CountHistoryType, IInventory } from '../types';

interface Props {
	inventoryList: IInventory[];
	editInventory: MutateTpye<PutInventoryBodyType>;
	workTimeStatus: string;
}
function GiftcardInventoryScreen({ inventoryList, editInventory, workTimeStatus }: Props) {
	const [isModified, setIsModified] = useState<boolean>(false);
	const submitInventoryRecord = (countHistory: CountHistoryType) => {
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
			<InventoryHeader title="문화 상품권" isNeedAlert={isModified} />

			<main className="pt-[7.2rem] space-y-[1.6rem] h-full  text-g9 relative">
				<InventoryCommonFlow
					inventoryList={inventoryList}
					workTimeStatus={workTimeStatus}
					onInventoryRecordSubmit={submitInventoryRecord}
					onModified={() => setIsModified(true)}
				/>
			</main>
		</>
	);
}

export default GiftcardInventoryScreen;
