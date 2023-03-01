import client from 'src/app.modules/api/client';

export interface WriteBody {
	title: string;
	content: string;
	category: string;
}

// 게시글 작성
export const boardWrite = async (body: WriteBody) => {
	const res = await client.post('api/board/post', { ...body });
	return res;
};

// 게시글 보기
export const boardView = async (postId: number) => {
	const res = await client.get('/api/board', { params: { postId } });
	return res;
};

// 게시글 수정
export const boardModify = async (postId: number) => {
	const res = await client.put('/api/board/post', { params: { postId } });
	return res;
};

// 게시글 삭제
export const boardDelete = async (postId: number) => {
	const res = await client.delete('/api/board/post', { params: { postId } });
	return res;
};
