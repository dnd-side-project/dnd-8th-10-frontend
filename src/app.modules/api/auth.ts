import client from './client';

export const oauth2 = async (code: string) => {
	//	console.log(code);
	const res = await client.get(`/oauth/token?code=${code}`);
	return res;
};

export const refreshToken = async () => {
	const res = await client.get('/oauth/token/refresh');
	console.log(res.headers);
};
