import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import GarbageBagInventoryScreen from 'src/app.features/inventory/screens/GarbageBagInventoryScreen';
import { getInventory, putInventory } from 'src/app.modules/api/inventory';

function GarbageBaInventory() {
	const { data: inventoryList, refetch } = useQuery(['inventory', 'garbageBag'], () => getInventory('GARBAGEBAG'), {
		select: (res) => res.data.data,
		onSuccess: (res) => console.log(res),
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false, // TODO: 이 config들 공통적용 해두기
	});

	const { mutate: editInventory, isLoading: editInventoryLoading } = useMutation(putInventory, {
		onSuccess: (res) => {
			alert('점검사항 저장완료.');
			refetch();
		},
		onError: (error) => alert('오류 발생.'),
	});

	return (
		<GarbageBagInventoryScreen
			inventoryList={inventoryList}
			editInventory={editInventory}
			editInventoryLoading={editInventoryLoading}
		/>
	);
}

export default GarbageBaInventory;
