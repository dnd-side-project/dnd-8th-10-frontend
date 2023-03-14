import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import SmallPopup from 'src/app.components/Modal/SmallPopup';
import GarbageBagInventoryScreen from 'src/app.features/inventory/screens/GarbageBagInventoryScreen';
import { getInventory, putInventory } from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';

function GarbageBaInventory() {
	const { isModalOpen: isPopupOpen, openModal: openPopup, closeModal: closePopup } = useModal();
	const { data: inventoryList, refetch } = useQuery(['inventory', 'garbageBag'], () => getInventory('GARBAGEBAG'), {
		select: (res) => res.data.data,
		onSuccess: (res) => console.log(res),
		onError: (error) => {
			console.log(error);
		},
	});

	const { mutate: editInventory, isLoading: editInventoryLoading } = useMutation(putInventory, {
		onSuccess: (res) => {
			console.log('반영완료');
			refetch();
			openPopup();
			setTimeout(() => {
				closePopup();
			}, 3000);
		},
		onError: (error) => alert('오류 발생.'),
	});

	return (
		<>
			{isPopupOpen && <SmallPopup />}
			<GarbageBagInventoryScreen
				inventoryList={inventoryList}
				editInventory={editInventory}
				editInventoryLoading={editInventoryLoading}
			/>
		</>
	);
}

export default GarbageBaInventory;
