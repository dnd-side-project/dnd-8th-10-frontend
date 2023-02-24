import { useMutation } from '@tanstack/react-query';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import CompleteSettingScreen from 'src/app.features/register/screens/CompleteSettingScreen';
import SetPhoneNumScreen from 'src/app.features/register/screens/SetPhoneNumScreen';
import SetStoreScreen from 'src/app.features/register/screens/SetWorkPlaceScreen';
import SetTimeScreen from 'src/app.features/register/screens/SetTimeScreen';
import SetRoleScreen from 'src/app.features/register/screens/SetRoleScreen';
import { postUser } from 'src/app.modules/api/user';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useUser from 'src/app.modules/hooks/user/useUser';

const Register: NextPage = () => {
	const {
		query: { page, userName: userNameOnUrl },
	} = useRouter();
	const { data, refetch } = useUser();
	const { mutate, isLoading } = useMutation(postUser, {
		onSuccess: (res) => {
			console.log(res, 'mutate결과');
			refetch();
			Router.push(`${SERVICE_URL.register}?page=5`);
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	// TODO: 새로고침할때 기존입력 데이터 복원할수 있게 or 경고모달
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return (
		<>
			{page === '1' && <SetRoleScreen userName={data?.userName ?? userNameOnUrl ?? ''} />}
			{page === '2' && <SetStoreScreen />}
			{page === '3' && <SetTimeScreen />}
			{page === '4' && <SetPhoneNumScreen postUserMutate={mutate} isLoading={isLoading} />}
			{page === '5' && <CompleteSettingScreen {...data} />}
		</>
	);
};

export default Register;
