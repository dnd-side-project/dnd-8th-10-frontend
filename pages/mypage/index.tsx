import React from 'react';
import TitleHead from 'src/app.components/TitleHead';
import MyPageScreen from 'src/app.features/mypage/screens/MyPageScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { logout } from 'src/app.modules/api/auth';
import useUser from 'src/app.modules/hooks/user/useUser';
import { deleteAllCookie, routeToLoginPage } from 'src/app.modules/util/logout';

function Mypage() {
	const { data } = useUser();
	const { localUser } = useLocalUserStore();
	const logoutHandler = async () => {
		await logout();
		deleteAllCookie();
		routeToLoginPage();
	};
	return (
		<>
			<TitleHead title="마이페이지" />
			<MyPageScreen user={data ?? localUser} logoutHandler={logoutHandler} />
		</>
	);
}

export default Mypage;
