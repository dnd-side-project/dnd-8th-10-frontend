import React, { useEffect, useState } from 'react';
import { IInventoryList } from 'src/app.modules/api/inventory';
import { CountHistoryType } from '../types';

function useCountHistory(inventoryList: IInventoryList[]) {
	const [countHistory, setCountHistory] = useState<CountHistoryType>({});
	const changeDiffHandler = (action: 'decrease' | 'increase', inventoryName: string, inventoryDiff: number) => {
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
	return { countHistory, changeDiffHandler };
}

export default useCountHistory;
