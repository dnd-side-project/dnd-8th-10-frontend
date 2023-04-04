import React, { useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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
	console.dir(headers);
	context.res.setHeader(
		'Set-Cookie',
		`Refresh=${(headers?.['refresh'] as string)?.split(' ')[1]}; max-age=${3600 * 24 * 7}; Path=/;`
	);
	const { role, userName } = data.data;
	return { props: { data: { role, userName, accessToken } } };
};
const Login = ({ data }: Props) => {
	const router = useRouter();
	useEffect(() => {
		const { role, userName, accessToken } = data;
		const isNewbie = !role;
		document.cookie = `${COOKIE_KEY.ACCESS_TOKEN}=${accessToken}; max-age=${3600 * 24 * 7}; Path=/;`;
		client.defaults.headers.Authorization = `Bearer ${getCookie(COOKIE_KEY.ACCESS_TOKEN)}`;
		if (isNewbie) {
			router.push(`${SERVICE_URL.register}?page=1&userName=${userName}`);
			document.cookie = `${COOKIE_KEY.IS_NEWBIE}=${true}; max-age=${3600 * 24 * 7}; Path=/;`;
		} else router.push(SERVICE_URL.home);
	}, []);

	return <div />;
};
export default Login;
