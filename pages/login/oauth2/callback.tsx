import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { oauth2 } from 'src/app.modules/api/auth';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { AxiosHeaders } from 'axios';
import { setCookie } from 'src/app.modules/cookie';

const test = {
	get: {
		Authoriazation: '',
	},
};
const Login: NextPage = () => {
	const router = useRouter();
	const { data } = useQuery(
		['oauth2', 'google'],
		() => oauth2(new URL(document.location.toString()).searchParams.get('code') as string),
		{
			onSuccess: (res) => {
				const accessToken = res?.headers['authorization']?.split(' ')[1]; // TODO: 토큰 발췌 방식 바꾸기
				const refreshToken = res?.headers['refresh']?.split(' ')[1];
				if (accessToken && refreshToken) {
					localStorage.setItem('ACCESS_TOKEN', accessToken);
					setCookie('REFRESH_TOKEN', refreshToken, { path: '/', secure: true, sameSite: 'none' });
				}
				router.push(SERVICE_URL.register); // TODO: 신규회원 || 필수정보를 입력하지 않은 경우면 register. 아니면 home으로 이동
			},
			onError: (error) => {
				console.log(error);
			},
			retry: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return <div />;
};
export default Login;
