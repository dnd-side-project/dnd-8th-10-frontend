import { useRouter } from 'next/router';
import React from 'react';
import ProfileSettingScreen from 'src/app.features/mypage/screens/ProfileSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { removeCookie } from 'src/app.modules/cookie';
import useUser from 'src/app.modules/hooks/user/useUser';

function Setting() {
	const { data } = useUser();

	const { localUser } = useLocalUserStore();

	return <ProfileSettingScreen user={data ?? localUser} />;
}

export default Setting;
