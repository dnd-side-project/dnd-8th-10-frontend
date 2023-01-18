import type { NextPage } from 'next';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import useStore from '../src/app.modules/store';

const Home: NextPage = () => {
	const { isDark, handleIsDark } = useStore();
	console.log(KAKAO_OAUTH2_URL);

	return (
		<div className={`w-screen h-screen  ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
			<button className="bg-yellow-400 rounded p-2 text-center mx-auto">
				<a href={KAKAO_OAUTH2_URL}>테스트용 카카오로그인 버튼</a>
			</button>
		</div>
	);
};

export default Home;
