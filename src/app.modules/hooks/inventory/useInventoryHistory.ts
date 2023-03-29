import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { InvetoryFilterType, mappedInventoryFilter } from 'src/app.features/inventory/types';
import { getInventoryRecord } from 'src/app.modules/api/inventory';

function useInventoryHistory() {
	const [filter, setFilter] = useState<InvetoryFilterType>('전체');
	const filterHandler = (e: React.BaseSyntheticEvent) => {
		setFilter(e?.target?.value);
	};
	const { data, refetch } = useQuery(
		['inventory', 'history', 'all'],
		() => getInventoryRecord(mappedInventoryFilter[filter]),
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
