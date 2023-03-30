import React from 'react';
import useCountHistory from '../../hooks/useCountHistory';
import { CountHistoryType, IInventory } from '../../types';
import InventoryList from '../InventoryList';
import InventoryCommonBottom from './InventoryCommonBottom';

interface Props {
	inventoryList: IInventory[];
	workTimeStatus: string;
	onInventoryRecordSubmit: (countHistory: CountHistoryType) => void;
}
function InventoryCommonFlow({ inventoryList, workTimeStatus, onInventoryRecordSubmit }: Props) {
	const { countHistory, changeDiffHandler } = useCountHistory(inventoryList);

	return (
		<>
			{inventoryList && (
				<InventoryList
					inventoryList={inventoryList}
					countHistory={countHistory}
					changeDiffHandler={changeDiffHandler}
				/>
			)}
			<InventoryCommonBottom
				countHistory={countHistory}
				workTimeStatus={workTimeStatus}
				onInventoryRecordSubmit={onInventoryRecordSubmit}
			/>
		</>
	);
}

export default InventoryCommonFlow;
