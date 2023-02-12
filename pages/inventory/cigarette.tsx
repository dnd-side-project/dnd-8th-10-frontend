import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import CigaretteInventoryScreen from 'src/app.features/inventory/screens/CigaretteInventoryScreen';
import { getCigaretteInventory, postCigarette, putInventory } from 'src/app.modules/api/inventory';

function cigarette() {
	const { data: cigaretteList, refetch } = useQuery(
		['inventory', 'cigarette'],
		() => getCigaretteInventory('CIGARETTE'),
		{
			select: (res) => res.data.data,
			onSuccess: (res) => console.log(res),
			onError: (error) => {
				console.log(error);
			},
			retry: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false, // TODO: 이 config들 공통적용 해두기
		}
	);
	// TODO: get 제외하고 합쳐도 될듯
	const { mutate: addCigarette, isLoading: addCigaretteLoading } = useMutation(postCigarette, {
		onSuccess: (res) => {
			alert('담배 추가완료.');
			refetch();
		},
		onError: (error) => alert('오류 발생.'),
	});
	const { mutate: editInventory, isLoading: editInventoryLoading } = useMutation(putInventory, {
		onSuccess: (res) => {
			alert('점검사항 저장완료.');
			refetch();
		},
		onError: (error) => alert('오류 발생.'),
	});

	return (
		<>
			{cigaretteList && (
				<CigaretteInventoryScreen
					cigaretteList={cigaretteList}
					addCigarette={addCigarette}
					addCigaretteLoading={addCigaretteLoading}
					editInventory={editInventory}
					editInventoryLoading={editInventoryLoading}
				/>
			)}
		</>
	);
}

export default cigarette;
