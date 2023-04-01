import React, { useEffect } from 'react';
import useCountHistory from '../../hooks/useCountHistory';
import { CountHistoryType, IInventory } from '../../types';
import InventoryList from '../InventoryList';
import InventorySave from './InventorySave';

interface Props {
	inventoryList: IInventory[];
	onInventoryRecordSubmit: (countHistory: CountHistoryType) => void;
	onModified: () => void;
}
function InventoryCommonFlow({ inventoryList, onInventoryRecordSubmit, onModified }: Props) {
	const { countHistory, changeDiffHandler, isModified } = useCountHistory(inventoryList);
	useEffect(() => {
		if (isModified) {
			onModified();
		}
	}, [isModified]);
	return (
		<>
			{inventoryList && (
				<InventoryList
					inventoryList={inventoryList}
					countHistory={countHistory}
					changeDiffHandler={changeDiffHandler}
				/>
			)}
			<InventorySave countHistory={countHistory} onInventoryRecordSubmit={onInventoryRecordSubmit} />
		</>
	);
}

export default InventoryCommonFlow;
