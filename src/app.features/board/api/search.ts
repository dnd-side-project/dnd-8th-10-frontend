import client from 'src/app.modules/api/client';

// 게시판 검색
export const boardSearch = async (content: string) => {
	const res = await client.get(`/api/board/search`, { params: { keyword: content } });
	return res;
};
