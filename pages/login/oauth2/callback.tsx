import React from 'react';
import type { NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { oauth2 } from 'src/app.modules/api/auth';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

import client from 'src/app.modules/api/client';
import { COOKIE_KEY } from 'src/app.modules/constants/Cookie';

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
					document.cookie = `${COOKIE_KEY.ACCESS_TOKEN}=${accessToken}; max-age=${3600 * 24 * 7}; Path=/;`;
					document.cookie = `${COOKIE_KEY.REFRESH_TOKEN}=${refreshToken}; max-age=${3600 * 24 * 7}; Path=/;`;
					client.defaults.headers.Authorization = `Bearer ${accessToken}`;
				}
				// 필수정보를 입력하지 않은 경우면 register. 아니면 home으로 이동
				const {
					data: {
						data: { role, userName },
					},
				} = res;
				const isNewbie = !role;
				if (isNewbie) {
					router.push(`${SERVICE_URL.register}?page=1&userName=${userName}`);
					document.cookie = `${COOKIE_KEY.IS_NEWBIE}=${true}; max-age=${3600 * 24 * 7}; Path=/;`;
				} else router.push(SERVICE_URL.home);
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
