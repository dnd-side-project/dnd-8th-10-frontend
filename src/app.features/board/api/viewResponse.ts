import client from 'src/app.modules/api/client';

// 게시글 체크
export const postViewCheck = async (postId: number) => {
	const res = await client.post(`/api/board/${postId}/check`);
	return res;
};
