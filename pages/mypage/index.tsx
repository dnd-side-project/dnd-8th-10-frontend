import React, { useEffect, useState } from 'react';
import MyPageScreen from 'src/app.features/mypage/screens/MyPageScreen';
import { IUser } from 'src/app.features/mypage/types';
import useUser from 'src/app.modules/hooks/user/useUser';

function Mypage() {
	const { data } = useUser();
	const [user, setUser] = useState<IUser>();
	useEffect(() => {
		const tmp = localStorage.getItem('USER');
		if (!tmp) return;
		setUser(JSON.parse(tmp));
	}, []);
	return <MyPageScreen user={data ?? user} />;
}

export default Mypage;
