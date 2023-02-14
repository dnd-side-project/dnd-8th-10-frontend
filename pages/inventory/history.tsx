import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';
import InventoryHistoryScreen from 'src/app.features/inventory/screens/InventoryHistoryScreen';
import { getInventoryRecord } from 'src/app.modules/api/inventory';

const History: NextPage = () => {
	const { data: inventoryHistory } = useQuery(['inventory', 'history'], getInventoryRecord, {
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
	});
	return <InventoryHistoryScreen inventoryHistory={inventoryHistory} />;
};

export default History;
