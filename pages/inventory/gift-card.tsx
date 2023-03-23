import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import SmallPopup from 'src/app.components/Modal/SmallPopup';
import GiftcardInventoryScreen from 'src/app.features/inventory/screens/GiftcardInventoryScreen';
import { getInventory, getIsWorkTime, putInventory } from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';

function GiftCard() {
	const { isModalOpen: isPopupOpen, openModal: openPopup, closeModal: closePopup } = useModal();
	// 200 or 404
	const { status: workTimeStatus } = useQuery(['inventory', 'isWorkTime'], getIsWorkTime, {
		select: (res) => res,
		onSuccess: (res) => console.log(res, 'isWorkTime'),
		onError: (error) => {
			console.log(error);
		},
	});

	const { data: inventoryList, refetch } = useQuery(['inventory', 'giftcard'], () => getInventory('GIFTCARD'), {
		select: (res) => res.data.data,
		onSuccess: (res) => console.log(res),
		onError: (error) => {
			console.log(error);
		},
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
			{isPopupOpen && <SmallPopup message="점검사항이 저장됐어요! 👀" />}
			<GiftcardInventoryScreen
				workTimeStatus={workTimeStatus}
				inventoryList={inventoryList}
				editInventory={editInventory}
				editInventoryLoading={editInventoryLoading}
			/>
		</>
	);
}

export default GiftCard;
