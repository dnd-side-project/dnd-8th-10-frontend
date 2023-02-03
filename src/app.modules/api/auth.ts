import client from './client';

export const oauth2 = async (code: string) => {
	const res = await client.get(`/oauth/token?code=${code}`);
	return res;
};

export const refreshToken = async () => {
	const res = await client.get('/oauth/token/refresh');
	return res;
};
