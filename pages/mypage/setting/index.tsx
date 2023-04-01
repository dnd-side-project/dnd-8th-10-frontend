import { useMutation } from '@tanstack/react-query';
import React from 'react';
import TitleHead from 'src/app.components/TitleHead';
import ProfileSettingScreen from 'src/app.features/mypage/screens/ProfileSettingScreen';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { deleteUser } from 'src/app.modules/api/user';
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

	return (
		<>
			<TitleHead title="회원정보 수정" />
			<ProfileSettingScreen user={data ?? localUser} delelteUserMutate={delelteUserMutate} />;
		</>
	);
}

export default Setting;
