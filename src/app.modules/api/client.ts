import { UseMutateFunction } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { COOKIE_KEY } from '../constants/Cookie';
import { SERVICE_URL } from '../constants/ServiceUrl';
import { getCookie, setCookie } from '../cookie';
import { deleteAllCookie, routeToLoginPage } from '../util/logout';

export type MutateTpye<T> = UseMutateFunction<AxiosResponse<any, any>, unknown, T, unknown>;

const client = axios.create({
	baseURL: 'https://wise24life.shop/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		Authorization: `Bearer ${getCookie(COOKIE_KEY.ACCESS_TOKEN)}`,
	},
});

client.interceptors.response.use(
	(res) => {
		return res;
	},
	async (error) => {
		const {
			config,
			response: { status },
		} = error;

		if (status === 401 && !config.url.includes('oauth')) {
			try {
				const originalRequest = config;
				// token refresh 요청

				const refreshToken = getCookie(COOKIE_KEY.REFRESH_TOKEN);
				const res = await client.get(
					'/oauth/token/refresh', // token refresh api
					{ headers: { refresh: refreshToken } }
				);
				const newAccessToken = res?.headers['authorization']?.split(' ')[1]; // TODO: 토큰 발췌 방식 바꾸기
				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
				if (newAccessToken && newRefreshToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
					console.log('엑세스 토큰 갱신 완료됨. ');
					console.log('리프레시 토큰 갱신 완료됨. ');
					// TODO: 쿠키만료기한 고려해서 로직 다시 짜기
					document.cookie = `${COOKIE_KEY.ACCESS_TOKEN}=${newAccessToken}; max-age=${3600 * 24 * 7}; Path=/;`;
					document.cookie = `${COOKIE_KEY.REFRESH_TOKEN}=${newRefreshToken}; max-age=${3600 * 24 * 7}; Path=/;`;
				}

				return client(originalRequest);
			} catch (refreshError) {
				deleteAllCookie();
				routeToLoginPage();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default client;
