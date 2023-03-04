import client from './client';

export const getAlarmList = async () => {
	const res = await client.get(`/api/notice/list`);
	return res;
};

export const getAlarmNotice = async () => {
	const res = await client.get(`/api/notice`);
	return res;
};
