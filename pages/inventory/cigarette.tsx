import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import SmallPopup from 'src/app.components/Modal/SmallPopup';
import CigaretteInventoryScreen from 'src/app.features/inventory/screens/CigaretteInventoryScreen';
import { getInventory, postCigarette, putInventory } from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';

function CigaretteInventory() {
	const { isModalOpen: isPopupOpen, openModal: openPopup, closeModal: closePopup } = useModal();
	const { data: cigaretteList, refetch } = useQuery(['inventory', 'cigarette'], () => getInventory('CIGARETTE'), {
		select: (res) => res.data.data,
		onSuccess: (res) => console.log(res),
		onError: (error) => {
			console.log(error);
		},
	});
	// TODO: get 제외하고 합쳐도 될듯
	const { mutate: addCigarette, isLoading: addCigaretteLoading } = useMutation(postCigarette, {
		onSuccess: (res) => {
			refetch();
			openPopup();
			setTimeout(() => {
				closePopup();
			}, 2500);
		},
		onError: (error) => alert('오류 발생.'),
	});
	const { mutate: editInventory, isLoading: editInventoryLoading } = useMutation(putInventory, {
		onSuccess: (res) => {
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

			<CigaretteInventoryScreen
				inventoryList={cigaretteList}
				addCigarette={addCigarette}
				addCigaretteLoading={addCigaretteLoading}
				editInventory={editInventory}
				editInventoryLoading={editInventoryLoading}
			/>
		</>
	);
}

export default CigaretteInventory;
