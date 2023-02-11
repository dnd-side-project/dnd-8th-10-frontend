import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CigaretteInventoryScreen from 'src/app.features/inventory/screens/CigaretteInventoryScreen';
import { getCigaretteInventory } from 'src/app.modules/api/inventory';

function cigarette() {
	const { data: cigaretteList, refetch } = useQuery(['inventory', 'cigarette'], getCigaretteInventory, {
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
	return <>{cigaretteList && <CigaretteInventoryScreen cigaretteList={cigaretteList} />}</>;
}

export default cigarette;
