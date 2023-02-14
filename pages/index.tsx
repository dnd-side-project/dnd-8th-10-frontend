import type { NextPage } from 'next';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { refreshToken } from 'src/app.modules/api/auth';
import { getUser } from 'src/app.modules/api/user';
import React, { useState } from 'react';
import ProfileImage from 'src/app.components/ProfileImage';

const Home: NextPage = () => {
	const { data } = useQuery(['user', 'me'], getUser, {
		select: (res) => res.data.data,
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
		<div className="bg-blue-400 w-full h-[100vh]  mx-auto">
			<ProfileImage size="md" userProfileCode={data?.userProfileCode} />
		</div>
	);
};

export default Home;
