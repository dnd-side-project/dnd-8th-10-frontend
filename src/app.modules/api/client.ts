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

		if (status === 401 && !config.url.includes('oauth')) {
			try {
				const originalRequest = config;
				// token refresh 요청

				const refreshToken = getCookie('REFRESH_TOKEN');
				const res = await client.get(
					'/oauth/token/refresh', // token refresh api
					{ headers: { refresh: refreshToken } }
				);
				const newAccessToken = res?.headers['authorization']?.split(' ')[1]; // TODO: 토큰 발췌 방식 바꾸기
				const newRefreshToken = res?.headers['refresh']?.split(' ')[1];
				if (newAccessToken && newRefreshToken) {
					const expires = new Date();
					expires.setFullYear(expires.getFullYear() + 10);
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					client.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
					console.log('엑세스 토큰 갱신 완료됨. ');
					console.log('리프레시 토큰 갱신 완료됨. ');
					document.cookie = `ACCESS_TOKEN=${newAccessToken};expires=${expires};path=/;Secure;SameSite=None`;
					document.cookie = `REFRESH_TOKEN=${newRefreshToken};expires=${expires};path=/;Secure;SameSite=None`;

					if (!getCookie('ACCESS_TOKEN')) {
						document.cookie = `ACCESS_TOKEN=${newAccessToken}; expires=${expires};path=/;  name=Secure; SameSite=None`;
						document.cookie = `REFRESH_TOKEN=${newRefreshToken}; expires=${expires};path=/;  name=Secure; SameSite=None`;
					}
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
