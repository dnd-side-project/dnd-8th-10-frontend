import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		const code = new URL(document.location.toString()).searchParams.get('code') as string;
		console.log('인가코드 : ', code);
	}, []);
	return <div />;
};
export default Login;
