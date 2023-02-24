import React from 'react';
import PhoneSettingScreen from 'src/app.features/mypage/screens/PhoneSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import useCookieUser from 'src/app.modules/hooks/user/useCookieUser';
import usePutUser from 'src/app.modules/hooks/user/usePutUser';
import useUser from 'src/app.modules/hooks/user/useUser';

function Phone() {
	const { data } = useUser();
	const { putUserMutate, isLoading } = usePutUser();
	const { localUser } = useLocalUserStore();
	return <PhoneSettingScreen user={data ?? localUser} putUser={putUserMutate} isLoading={isLoading} />;
}

export default Phone;
