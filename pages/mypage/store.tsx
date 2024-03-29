import React, { useEffect, useState } from 'react';
import TitleHead from 'src/app.components/TitleHead';
import MyStoreScreen from 'src/app.features/mypage/screens/MyStoreScreen';
import { getCookie } from 'src/app.modules/cookie';
import useStore from 'src/app.modules/hooks/user/useStore';

function Store() {
	const { data } = useStore();
	const [cookieStore, setCookieStore] = useState();

	useEffect(() => {
		setCookieStore(getCookie('STORE'));
	}, []);
	return (
		<>
			<TitleHead title={data?.storeName ?? ''} />
			<MyStoreScreen store={data ?? cookieStore} />
		</>
	);
}

export default Store;
