import React from 'react';
import WageSettingScreen from 'src/app.features/mypage/screens/WageSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import usePutUser from 'src/app.modules/hooks/user/usePutUser';
import useUser from 'src/app.modules/hooks/user/useUser';

function Wage() {
	const { data } = useUser();
	const { putUserMutate, isLoading } = usePutUser();
	const { localUser } = useLocalUserStore();
	return <WageSettingScreen user={data ?? localUser} putUser={putUserMutate} isLoading={isLoading} />;
}

export default Wage;
