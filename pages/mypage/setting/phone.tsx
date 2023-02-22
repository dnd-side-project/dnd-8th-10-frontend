import React from 'react';
import PhoneSettingScreen from 'src/app.features/mypage/screens/PhoneSettingScreen';
import usePutUser from 'src/app.modules/hooks/user/usePutUser';
import useUser from 'src/app.modules/hooks/user/useUser';

function Phone() {
	const { data } = useUser();
	const { putUserMutate, isLoading } = usePutUser();
	return <PhoneSettingScreen user={data} putUser={putUserMutate} isLoading={isLoading} />;
}

export default Phone;
