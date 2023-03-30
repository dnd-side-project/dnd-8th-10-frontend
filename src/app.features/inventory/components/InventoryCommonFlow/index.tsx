import React, { useEffect } from 'react';
import useCountHistory from '../../hooks/useCountHistory';
import { CountHistoryType, IInventory } from '../../types';
import InventoryList from '../InventoryList';
import InventoryCommonBottom from './InventoryCommonBottom';

interface Props {
	inventoryList: IInventory[];
	workTimeStatus: string;
	onInventoryRecordSubmit: (countHistory: CountHistoryType) => void;
	onModified: () => void;
}
function InventoryCommonFlow({ inventoryList, workTimeStatus, onInventoryRecordSubmit, onModified }: Props) {
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
			<InventoryCommonBottom
				countHistory={countHistory}
				workTimeStatus={workTimeStatus}
				onInventoryRecordSubmit={onInventoryRecordSubmit}
			/>
		</>
	);
}

export default InventoryCommonFlow;
