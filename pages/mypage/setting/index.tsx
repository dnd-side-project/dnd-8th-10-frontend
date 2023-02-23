import React, { useEffect, useState } from 'react';
import ProfileSettingScreen from 'src/app.features/mypage/screens/ProfileSettingScreen';
import { IUser } from 'src/app.features/mypage/types';
import useUser from 'src/app.modules/hooks/user/useUser';

function Setting() {
	const { data } = useUser();
	const [user, setUser] = useState<IUser>();
	useEffect(() => {
		const tmp = localStorage.getItem('USER');
		if (!tmp) return;
		setUser(JSON.parse(tmp));
	}, []);
	return <ProfileSettingScreen user={data ?? user} />;
}

export default Setting;
