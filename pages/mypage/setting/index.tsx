import React from 'react';
import ProfileSettingScreen from 'src/app.features/mypage/screens/ProfileSettingScreen';
import useUser from 'src/app.modules/hooks/user/useUser';

function Setting() {
	const { data } = useUser();
	return <ProfileSettingScreen user={data} />;
}

export default Setting;
