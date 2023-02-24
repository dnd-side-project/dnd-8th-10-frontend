import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import MyStoreScreen from 'src/app.features/mypage/screens/MyStoreScreen';
import { getStoreInfo } from 'src/app.modules/api/user';
import { getCookie, setCookie } from 'src/app.modules/cookie';
import useCookieUser from 'src/app.modules/hooks/user/useCookieUser';

function Store() {
	const { data } = useQuery(['user', 'store'], getStoreInfo, {
		select: (res) => res.data.data,
		onSuccess: (res) => {
			setCookie('STORE', JSON.stringify(res));
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const [cookieStore, setCookieStore] = useState();

	useEffect(() => {
		setCookieStore(getCookie('STORE'));
	}, []);
	return <MyStoreScreen store={data ?? cookieStore} />;
}

export default Store;
