import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import SmallPopup from 'src/app.components/Modal/SmallPopup';
import GarbageBagInventoryScreen from 'src/app.features/inventory/screens/GarbageBagInventoryScreen';
import { getInventory, getIsWorkTime, putInventory } from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';
import { NextPage } from 'next';

const GarbageBaInventory: NextPage = () => {
	const { isModalOpen: isPopupOpen, openModal: openPopup, closeModal: closePopup } = useModal();
	const { data: inventoryList, refetch } = useQuery(['inventory', 'garbageBag'], () => getInventory('GARBAGEBAG'), {
		select: (res) => res.data.data,
		onSuccess: (res) => console.log(res),
		onError: (error) => {
			console.log(error);
		},
	});
	// 200 or 404
	// TODO: 최적화 필요
	const { status: workTimeStatus } = useQuery(['inventory', 'isWorkTime'], getIsWorkTime, {
		select: (res) => res,
		onSuccess: (res) => console.log(res, 'isWorkTime'),
		onError: (error) => {
			console.log(error);
		},
	});

	const { mutate: editInventory } = useMutation(putInventory, {
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
			{isPopupOpen && <SmallPopup message="점검사항이 저장됐어요! 👀" />}
			<GarbageBagInventoryScreen
				workTimeStatus={workTimeStatus}
				inventoryList={inventoryList}
				editInventory={editInventory}
			/>
		</>
	);
};

export default GarbageBaInventory;
