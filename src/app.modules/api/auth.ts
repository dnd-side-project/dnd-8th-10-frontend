import axios from 'axios';
import { COOKIE_KEY } from '../constants/Cookie';
import { getCookie } from '../cookie';
import client from './client';

export const oauth2 = async (code: string) => {
	const isLocal = Boolean(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI?.includes('localhost'));
	console.log('isLocal', isLocal);
	const res = await axios.get(`/oauth/token?code=${code}&isLocal=${isLocal}`);
	return res;
};

export const refreshToken = async () => {
	const res = await client.get('/oauth/token/refresh');
	return res;
};

export const logout = async (): Promise<unknown> => {
	try {
		const refreshFromCookie = getCookie(COOKIE_KEY.REFRESH_TOKEN);
		const res = await client.get('/api/user/logout', {
			headers: { refresh: `Bearer ${refreshFromCookie}` },
		});
		return res;
	} catch (error) {
		console.log(error);
		alert('에러 발생');
		return error;
	}
};
