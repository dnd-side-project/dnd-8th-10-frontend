import { useQuery } from '@tanstack/react-query';
import React from 'react';
import MyStoreScreen from 'src/app.features/mypage/screens/MyStoreScreen';
import { getStoreInfo } from 'src/app.modules/api/user';

function Store() {
	const { data } = useQuery(['user', 'store'], getStoreInfo, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	return <MyStoreScreen store={data} />;
}

export default Store;
