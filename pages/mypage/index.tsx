import React from 'react';
import MyPageScreen from 'src/app.features/mypage/screens/MyPageScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

function Mypage() {
	const { data } = useUser();

	return <MyPageScreen user={data} />;
}

export default Mypage;
