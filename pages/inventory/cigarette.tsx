import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import SmallPopup from 'src/app.components/Modal/SmallPopup';
import CigaretteInventoryScreen from 'src/app.features/inventory/screens/CigaretteInventoryScreen';
import {
	deleteInventory,
	getInventory,
	getIsWorkTime,
	postCigarette,
	putInventory,
} from 'src/app.modules/api/inventory';
import useModal from 'src/app.modules/hooks/useModal';
import { NextPage } from 'next';
import TitleHead from 'src/app.components/TitleHead';

const CigaretteInventory: NextPage = () => {
	const { isModalOpen: isSavePopupOpen, openModal: openSavePopup, closeModal: closeSavePopup } = useModal();
	const { isModalOpen: isAddPopupOpen, openModal: openAddPopup, closeModal: closeAddPopup } = useModal();
	const { data: cigaretteList, refetch } = useQuery(['inventory', 'cigarette'], () => getInventory('CIGARETTE'), {
		select: (res) => res.data.data,
		onSuccess: (res) => console.log(res),
		onError: (error) => {
			console.log(error);
		},
	});
	// 200 or 404
	const { status: workTimeStatus } = useQuery(['inventory', 'isWorkTime'], getIsWorkTime, {
		select: (res) => res,
		onSuccess: (res) => console.log(res, 'isWorkTime'),
		onError: (error) => {
			console.log(error);
		},
	});
	// TODO: get 제외하고 합쳐도 될듯
	const { mutate: addCigarette, isLoading: addCigaretteLoading } = useMutation(postCigarette, {
		onSuccess: (res) => {
			refetch();
			openAddPopup();
			setTimeout(() => {
				closeAddPopup();
			}, 2500);
		},
		onError: (error) => alert('오류 발생.'),
	});
	const { mutate: editInventory } = useMutation(putInventory, {
		onSuccess: (res) => {
			refetch();
			openSavePopup();
			setTimeout(() => {
				closeSavePopup();
			}, 2500);
		},
		onError: (error) => alert('오류 발생.'),
	});
	const { mutate: deleteInventoryMutate } = useMutation(deleteInventory, {
		onSuccess: (res) => {
			refetch();
		},
		onError: (error) => alert('오류 발생.'),
	});
	return (
		<>
			<TitleHead title="담배 시재" />
			{isSavePopupOpen && <SmallPopup message="점검사항이 저장됐어요! 👀" />}
			{isAddPopupOpen && <SmallPopup message="담배 항목이 추가되었어요! 👀" />}

			<CigaretteInventoryScreen
				workTimeStatus={workTimeStatus}
				inventoryList={cigaretteList}
				addCigarette={addCigarette}
				addCigaretteLoading={addCigaretteLoading}
				editInventory={editInventory}
				deleteInventoryMutate={deleteInventoryMutate}
			/>
		</>
	);
};

export default CigaretteInventory;
