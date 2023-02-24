import React from 'react';
import MyPageScreen from 'src/app.features/mypage/screens/MyPageScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import useUser from 'src/app.modules/hooks/user/useUser';

function Mypage() {
	const { data } = useUser();
	const { localUser } = useLocalUserStore();
	console.log(localUser, 'localuser');
	return <MyPageScreen user={data ?? localUser} />;
}

export default Mypage;
