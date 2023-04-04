import React, { useEffect } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { oauth2 } from 'src/app.modules/api/auth';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

import client from 'src/app.modules/api/client';
import { COOKIE_KEY } from 'src/app.modules/constants/Cookie';
import axios from 'axios';
import { IUser } from 'src/app.modules/types/user';
import { getCookie } from 'src/app.modules/cookie';

interface Props {
	data: { role: IUser['role']; userName: IUser['userName']; accessToken: string };
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
	const {
		query: { code },
	} = context;
	const isLocal = Boolean(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI?.includes('localhost'));
	const res = await axios.get(`https://wise24life.shop/oauth/token?code=${code}&isLocal=${isLocal}`);

	const { headers, data } = res;
	const accessToken = headers?.['authorization'].split(' ')[1];
	console.dir(accessToken);
	context.res.setHeader('Set-Cookie', headers?.['set-cookie']?.[0] as string);
	const { role, userName } = res.data.data;
	return { props: { data: { role, userName, accessToken } } };
};
const Login = ({ data }: Props) => {
	const router = useRouter();
	useEffect(() => {
		const { role, userName, accessToken } = data;
		const isNewbie = !role;
		document.cookie = `${COOKIE_KEY.ACCESS_TOKEN}=${accessToken}; max-age=${3600 * 24 * 7}; Path=/;`;
		client.defaults.headers.Authorization = `Bearer ${getCookie(COOKIE_KEY.ACCESS_TOKEN)}`;
		console.log(accessToken, getCookie(COOKIE_KEY.ACCESS_TOKEN));
		if (isNewbie) {
			router.push(`${SERVICE_URL.register}?page=1&userName=${userName}`);
			document.cookie = `${COOKIE_KEY.IS_NEWBIE}=${true}; max-age=${3600 * 24 * 7}; Path=/;`;
		} else router.push(SERVICE_URL.home);
	}, []);
	/* const { data } = useQuery(
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
	); */

	return <div />;
};
export default Login;
