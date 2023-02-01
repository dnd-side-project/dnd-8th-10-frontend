import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';

function Login() {
	const router = useRouter();

	return (
		<div className="w-screen h-screen">
			<button className="bg-yellow-400 rounded p-2 text-center mx-auto">
				<a href={KAKAO_OAUTH2_URL}>테스트용 카카오로그인 버튼</a>
			</button>
		</div>
	);
}

export default Login;
