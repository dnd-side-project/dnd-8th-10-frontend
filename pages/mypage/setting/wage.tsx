import React from 'react';
import TitleHead from 'src/app.components/TitleHead';
import WageSettingScreen from 'src/app.features/mypage/screens/WageSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import usePutUser from 'src/app.modules/hooks/user/usePutUser';
import useUser from 'src/app.modules/hooks/user/useUser';

function Wage() {
	const { data } = useUser();
	const { putUserMutate, isLoading } = usePutUser();
	const { localUser } = useLocalUserStore();

	return (
		<>
			<TitleHead title="시급 수정" />
			<WageSettingScreen user={data ?? localUser} putUser={putUserMutate} isLoading={isLoading} />
		</>
	);
}

export default Wage;
