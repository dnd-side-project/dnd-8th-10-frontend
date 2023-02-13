import React, { useState } from 'react';
import { CountHistoryType } from '../types';

function useCountHistory() {
	const [countHistory, setCountHistory] = useState<CountHistoryType>({});
	const changeDiffHandler = (action: 'decrease' | 'increase', inventoryName: string, inventoryDiff: number) => {
		setCountHistory({
			...countHistory,
			[inventoryName]: (countHistory[inventoryName] ?? inventoryDiff) + (action === 'decrease' ? -1 : 1),
		});
	};
	return { countHistory, changeDiffHandler };
}

export default useCountHistory;
