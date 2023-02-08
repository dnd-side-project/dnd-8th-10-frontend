import { UseMutateFunction } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { getCookie, setCookie } from '../cookie';

export type MutateTpye<T> = UseMutateFunction<AxiosResponse<any, any>, unknown, T, unknown>;

const client = axios.create({
	baseURL: 'https://wise24life.shop/',
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Credentials': true,
		Authorization: `Bearer ${getCookie('ACCESS_TOKEN')}`,
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

		if (status === 401 && config.url !== '/oauth/token/refresh') {
			try {
				const originalRequest = config;
				console.log(config.url);
				// token refresh 요청
				const refreshToken = getCookie('REFRESH_TOKEN');
				const res = await client.get(
					'/oauth/token/refresh', // token refresh api
					{ headers: { Refresh: refreshToken } }
				);
				const newAccessToken = res?.headers['authorization']?.split(' ')[1]; // TODO: 토큰 발췌 방식 바꾸기
				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
				if (newAccessToken && newRefreshToken) {
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					setCookie('ACCESS_TOKEN', newAccessToken, { path: '/', secure: true, sameSite: 'none' });
					setCookie('REFRESH_TOKEN', newRefreshToken, { path: '/', secure: true, sameSite: 'none' });
				}
				return client(originalRequest);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default client;
