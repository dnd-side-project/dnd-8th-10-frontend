import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import CompleteSettingScreen from 'src/app.features/register/screens/CompleteSettingScreen';
import SetPhoneNumScreen from 'src/app.features/register/screens/SetPhoneNumScreen';
import SetStoreScreen from 'src/app.features/register/screens/SetStoreScreen';
import SetTimeScreen from 'src/app.features/register/screens/SetTimeScreen';
import SetUserTypeScreen from 'src/app.features/register/screens/SetUserTypeScreen';

const Register: NextPage = () => {
	const {
		query: { page },
	} = useRouter();
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return (
		<>
			{page === '1' && <SetUserTypeScreen />}
			{page === '2' && <SetStoreScreen />}
			{page === '3' && <SetTimeScreen />}
			{page === '4' && <SetPhoneNumScreen />}
			{page === '5' && <CompleteSettingScreen />}
		</>
	);
};

export default Register;
