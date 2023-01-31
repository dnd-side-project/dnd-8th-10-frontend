import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { oauth2 } from 'src/app.modules/api/auth';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { AxiosHeaders } from 'axios';

interface ExtendedHeader extends AxiosHeaders {
	Authorization: string;
}

const Login: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		fetch(
			`https://wise24life.shop/api/oauth/token?code=${
				new URL(document.location.toString()).searchParams.get('code') as string
			}`
		).then((response) => {
			console.log(response.headers.get('Authorization'));
			console.log(response.headers.get('Refresh'));
		});
	}, []);
	return <div>OauthCallback</div>;
};
export default Login;
