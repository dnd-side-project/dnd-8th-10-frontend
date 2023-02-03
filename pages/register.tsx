import { useMutation } from '@tanstack/react-query';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import CompleteSettingScreen from 'src/app.features/register/screens/CompleteSettingScreen';
import SetPhoneNumScreen from 'src/app.features/register/screens/SetPhoneNumScreen';
import SetStoreScreen from 'src/app.features/register/screens/SetStoreScreen';
import SetTimeScreen from 'src/app.features/register/screens/SetTimeScreen';
import SetUserTypeScreen from 'src/app.features/register/screens/SetUserTypeScreen';
import { postUser } from 'src/app.modules/api/user';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

const Register: NextPage = () => {
	const {
		query: { page },
	} = useRouter();
	const { mutate, isLoading } = useMutation(postUser, {
		onSuccess: (res) => {
			console.log(res);
			Router.push(`${SERVICE_URL.register}?page=5`);
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return (
		<>
			{page === '1' && <SetUserTypeScreen />}
			{page === '2' && <SetStoreScreen />}
			{page === '3' && <SetTimeScreen />}
			{page === '4' && <SetPhoneNumScreen postUser={mutate} isLoading={isLoading} />}
			{page === '5' && <CompleteSettingScreen />}
		</>
	);
};

export default Register;
