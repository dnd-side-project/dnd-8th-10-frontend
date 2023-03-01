import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { InventoryType, mappedFilter } from 'src/app.features/inventory/types';
import { Category, getInventoryRecord } from 'src/app.modules/api/inventory';

function useInventoryHistory() {
	const [filter, setFilter] = useState<InventoryType>('전체');
	const filterHandler = (e: React.BaseSyntheticEvent) => {
		setFilter(e?.target?.value);
	};
	const { data, refetch } = useQuery(
		['inventory', 'history', 'all'],
		() => getInventoryRecord(mappedFilter[filter] as Category | 'ALL'),
		{
			select: (res) => res.data.data,
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);
	return { filter, filterHandler, data, refetch };
}

export default useInventoryHistory;
