import type { NextPage } from 'next';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { refreshToken } from 'src/app.modules/api/auth';
import useStore from '../src/app.modules/store';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	const router = useRouter();
	const { data } = useQuery(['oauth2', 'google'], () => refreshToken(), {
		onSuccess: (res) => {
			console.log(res);
			// router.push(SERVICE_URL.home); // TODO: 로그인 이전 페이지로 보내기
		},
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	return (
		<div className="w-screen h-screen">
			<button className="bg-yellow-400 rounded p-2 text-center mx-auto">
				<a href={KAKAO_OAUTH2_URL}>테스트용 카카오로그인 버튼</a>
			</button>
		</div>
	);
};

export default Home;
