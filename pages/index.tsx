import type { NextPage } from 'next';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { refreshToken } from 'src/app.modules/api/auth';
import { getUser } from 'src/app.modules/api/user';

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
	return <div />;
};

export default Home;
