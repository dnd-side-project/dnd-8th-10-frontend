import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import ProfileSettingScreen from 'src/app.features/mypage/screens/ProfileSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { deleteUser } from 'src/app.modules/api/user';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { removeCookie } from 'src/app.modules/cookie';
import useUser from 'src/app.modules/hooks/user/useUser';
import { deleteAllCookie, routeToLoginPage } from 'src/app.modules/util/logout';

function Setting() {
	const { data } = useUser();

	const { localUser } = useLocalUserStore();
	const { mutate: delelteUserMutate, isLoading } = useMutation(deleteUser, {
		onSuccess: (res) => {
			deleteAllCookie();
			console.log(res);
			routeToLoginPage();
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});

	return <ProfileSettingScreen user={data ?? localUser} delelteUserMutate={delelteUserMutate} />;
}

export default Setting;
