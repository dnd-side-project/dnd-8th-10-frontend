import React, { useEffect, useState } from 'react';
import { CountHistoryType, IInventory } from '../types';

function useCountHistory(inventoryList: IInventory[]) {
	const [countHistory, setCountHistory] = useState<CountHistoryType>({});
	const [isModified, setIsModified] = useState<boolean>(false);
	const changeDiffHandler = (action: 'decrease' | 'increase', inventoryName: string, inventoryDiff: number): void => {
		if (!isModified) {
			setIsModified(true);
		} // 수정 동작 감지
		setCountHistory({
			...countHistory,
			[inventoryName]: (countHistory[inventoryName] ?? inventoryDiff) + (action === 'decrease' ? -1 : 1),
		});
	};
	useEffect(() => {
		if (!inventoryList) return;
		const hasDiffList = inventoryList.filter((item) => item.inventoryCount !== 0);
		const initCountHistory = Object.fromEntries(hasDiffList.map((item) => [item.inventoryName, item.inventoryCount]));
		setCountHistory(initCountHistory);
	}, [inventoryList]);
	return { countHistory, changeDiffHandler, isModified };
}

export default useCountHistory;
