import { useQuery } from '@tanstack/react-query';
import React from 'react';
import InventoryScreen from 'src/app.features/inventory/screens/InventoryScreen';
import { getInventoryRecordToday } from 'src/app.modules/api/inventory';
import { NextPage } from 'next';
import TitleHead from 'src/app.components/TitleHead';

// TODO: 인벤토리 폴더 구조 변경 필요. 겹치는 코드 많음
// TODO: 여기서 하위 시재점검 페이지들 preFetching 필요
const Inventory: NextPage = () => {
	const { data } = useQuery(['inventory', 'history', 'today'], getInventoryRecordToday, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return (
		<>
			<TitleHead title="시재 점검" />
			<InventoryScreen inventoryHistory={data} />
		</>
	);
};

export default Inventory;
