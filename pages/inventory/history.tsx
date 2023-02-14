import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import InventoryHistoryScreen from 'src/app.features/inventory/screens/InventoryHistoryScreen';
import { InventoryType, mappedFilter } from 'src/app.features/inventory/types';
import { Category, getInventoryRecord } from 'src/app.modules/api/inventory';

const History: NextPage = () => {
	const [filter, setFilter] = useState<InventoryType>('전체');
	const filterHandler = (e: React.BaseSyntheticEvent) => {
		setFilter(e?.target?.value);
	};
	const { data: inventoryHistory, refetch } = useQuery(
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
			retry: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);
	useEffect(() => {
		refetch();
	}, [filter]);
	return <InventoryHistoryScreen inventoryHistory={inventoryHistory} filter={filter} filterHandler={filterHandler} />;
};

export default History;
