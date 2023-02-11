import type { NextPage } from 'next';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { refreshToken } from 'src/app.modules/api/auth';
import { getUser } from 'src/app.modules/api/user';
import React, { useState } from 'react';

const Home: NextPage = () => {
	const { data } = useQuery(['user', 'me'], getUser, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});
	const [width, setWidth] = useState<string>('600');
	const onSubmit = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		const newWidth = e.target.width.value;
		if (!Number(newWidth)) return;
		setWidth(newWidth);
	};
	return (
		<div className="bg-blue-400 w-full h-[100vh]  mx-auto" style={{ maxWidth: `${width}px` }}>
			<span>화면 너비 확인</span>
			<form onSubmit={onSubmit}>
				<input
					placeholder="원하시는 화면 너비를 입력해보세요.단위 px. px 빼고 입력ex.600px 이면 600으로 입력"
					type="text"
					name="width"
					className="w-full"
				/>
			</form>
		</div>
	);
};

export default Home;
