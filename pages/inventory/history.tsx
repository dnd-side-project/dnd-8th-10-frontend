import { NextPage } from 'next';
import React, { useEffect } from 'react';
import InventoryHistoryScreen from 'src/app.features/inventory/screens/InventoryHistoryScreen';
import useInventoryHistory from 'src/app.modules/hooks/inventory/useInventoryHistory';

const History: NextPage = () => {
	const { filter, filterHandler, data, refetch } = useInventoryHistory();
	useEffect(() => {
		refetch();
	}, [filter]);
	return <InventoryHistoryScreen inventoryHistory={data} filter={filter} onFilterChange={filterHandler} />;
};

export default History;
