import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import MyStoreScreen from 'src/app.features/mypage/screens/MyStoreScreen';
import { getStoreInfo } from 'src/app.modules/api/user';
import { getCookie, setCookie } from 'src/app.modules/cookie';
import useStore from 'src/app.modules/hooks/user/useStore';

function Store() {
	const { data } = useStore();
	const [cookieStore, setCookieStore] = useState();

	useEffect(() => {
		setCookieStore(getCookie('STORE'));
	}, []);
	return <MyStoreScreen store={data ?? cookieStore} />;
}

export default Store;
