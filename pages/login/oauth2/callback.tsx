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
				// eslint-disable-next-line dot-notation
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const accessToken = (res.headers.get as any)('Authorization').split(' ')[1]; // TODO: 토큰 발췌 방식 바꾸기
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const refreshToken = (res.headers.get as any)('Refresh').split(' ')[1];
				localStorage.setItem('ACCESS_TOKEN', accessToken);
				console.log(accessToken, refreshToken);
				setCookie('REFRESH_TOKEN', refreshToken, { path: '/', secure: true, sameSite: 'none' });
				// router.push(SERVICE_URL.home); // TODO: 로그인 이전 페이지로 보내기
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
	/* useEffect(() => {
		fetch(
			`https://wise24life.shop/api/oauth/token?code=${
				new URL(document.location.toString()).searchParams.get('code') as string
			}`
		).then((response) => {
			console.log(response.headers.get('Authorization')?.split(' ')[1]);
			console.log(response.headers.get('Refresh'));
		});
	}, []); */
	return <div>OauthCallback</div>;
};
export default Login;
