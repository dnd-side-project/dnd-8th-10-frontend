import client from './client';

export const oauth2 = async (code: string) => {
	const isLocal = Boolean(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI?.includes('localhost'));
	console.log('isLocal', isLocal);
	const res = await client.get(`/oauth/token?code=${code}&isLocal=${isLocal}`);
	return res;
};

export const refreshToken = async () => {
	const res = await client.get('/oauth/token/refresh');
	return res;
};
