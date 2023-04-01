import React from 'react';
import TitleHead from 'src/app.components/TitleHead';
import PhoneSettingScreen from 'src/app.features/mypage/screens/PhoneSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import usePutUser from 'src/app.modules/hooks/user/usePutUser';
import useUser from 'src/app.modules/hooks/user/useUser';

function Phone() {
	const { data } = useUser();
	const { putUserMutate, isLoading } = usePutUser();
	const { localUser } = useLocalUserStore();
	return (
		<>
			<TitleHead title="전화번호 수정" />
			<PhoneSettingScreen user={data ?? localUser} putUser={putUserMutate} isLoading={isLoading} />
		</>
	);
}

export default Phone;
