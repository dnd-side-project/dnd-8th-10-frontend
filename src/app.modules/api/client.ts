import { UseMutateFunction } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { getCookie, setCookie } from '../cookie';

export type MutateTpye<T> = UseMutateFunction<AxiosResponse<any, any>, unknown, T, unknown>;

const client = axios.create({
	baseURL: 'https://wise24life.shop/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
	},
});

client.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem('ACCESS_TOKEN');
	if (accessToken) {
		client.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`;
	}

	return config;
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

		if (status === 401 && config.url !== '/oauth/token/refresh') {
			try {
				const originalRequest = config;

				// token refresh 요청
				const refreshToken = getCookie('REFRESH_TOKEN');
				const res = await client.get(
					'/oauth/token/refresh', // token refresh api
					{ headers: { Refresh: refreshToken } }
				);
				const newAccessToken = res?.headers['authorization']?.split(' ')[1]; // TODO: 토큰 발췌 방식 바꾸기
				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
				if (newAccessToken && newRefreshToken) {
					localStorage.setItem('ACCESS_TOKEN', newAccessToken);
					client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
					setCookie('REFRESH_TOKEN', refreshToken, { path: '/', secure: true, sameSite: 'none' });
				}
				return client(originalRequest);
			} catch (refreshError) {
				localStorage.removeItem('ACCESS_TOKEN');
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default client;
