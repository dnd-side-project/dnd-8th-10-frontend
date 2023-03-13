import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import MyPageScreen from 'src/app.features/mypage/screens/MyPageScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { logout } from 'src/app.modules/api/auth';
import { COOKIE_KEY } from 'src/app.modules/constants/Cookie';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { removeCookie } from 'src/app.modules/cookie';
import useUser from 'src/app.modules/hooks/user/useUser';
import { deleteAllCookie, routeToLoginPage } from 'src/app.modules/util/logout';

function Mypage() {
	const router = useRouter();
	const { data } = useUser();
	const { localUser } = useLocalUserStore();

	console.log(localUser, 'localuser');
	const logoutHandler = async () => {
		console.log('logout');

		const res = await logout();
		console.log(res);
		deleteAllCookie();
		routeToLoginPage();
	};
	return <MyPageScreen user={data ?? localUser} logoutHandler={logoutHandler} />;
}

export default Mypage;
