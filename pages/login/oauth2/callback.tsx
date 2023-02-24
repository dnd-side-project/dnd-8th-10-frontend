import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { oauth2 } from 'src/app.modules/api/auth';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { AxiosHeaders } from 'axios';
import { setCookie } from 'src/app.modules/cookie';
import client from 'src/app.modules/api/client';

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
					const expires = new Date();
					expires.setFullYear(expires.getFullYear() + 10);

					setCookie('REFRESH_TOKEN', refreshToken, { path: '/', secure: true, sameSite: 'none', expires });
					setCookie('ACCESS_TOKEN', accessToken, { path: '/', secure: true, sameSite: 'none', expires });
					client.defaults.headers.Authorization = `Bearer ${accessToken}`;
				}
				// 필수정보를 입력하지 않은 경우면 register. 아니면 home으로 이동
				const {
					data: {
						data: { role, userName },
					},
				} = res;
				const isNewbie = !role;
				if (isNewbie) router.push(`${SERVICE_URL.register}?page=1&userName=${userName}`);
				else router.push(SERVICE_URL.home);
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);
	/* useEffect(() => {
		const code = new URL(document.location.toString()).searchParams.get('code') as string;
		console.log('인가코드 : ', code);
	}, []); */

	return <div />;
};
export default Login;
