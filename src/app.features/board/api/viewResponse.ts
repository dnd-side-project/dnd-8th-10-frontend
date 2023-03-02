import client from 'src/app.modules/api/client';

// 게시글 체크
export const postViewCheck = async (postId: number) => {
	const res = await client.post(`/api/board/${postId}/check`);
	return res;
};

export interface PostCommentBody {
	postId: number;
	content: string;
}

// 댓글 작성
export const postComment = async (body: PostCommentBody) => {
	const { postId, ...rest } = body;
	const res = await client.post(`/api/board/${postId}/comment`, { ...rest });
	return res;
};
