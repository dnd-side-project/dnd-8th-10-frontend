import type { NextPage } from 'next';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { refreshToken } from 'src/app.modules/api/auth';
import useStore from '../src/app.modules/store';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return <div />;
};

export default Home;
