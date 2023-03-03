import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getStoreInfo } from 'src/app.modules/api/user';
import { getCookie } from 'src/app.modules/cookie';

function useStore(disabled?: boolean) {
	const { data, refetch } = useQuery(['user', 'store'], getStoreInfo, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			console.log(res);
			if (JSON.stringify(getCookie('STORE')) === JSON.stringify(res)) return;
			const expires = new Date();
			expires.setDate(expires.getDate() + 7); // 일주일 동안 저장
			document.cookie = `STORE=${encodeURIComponent(JSON.stringify(res))};expires=${expires};path=/`;
		},
		onError: (error) => {
			console.log(error);
		},
		enabled: !disabled,
	});
	return { data, refetch };
}

export default useStore;
