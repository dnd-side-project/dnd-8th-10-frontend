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
export interface DeleteCommentParam {
	postId: number;
	commentId: number;
}
// 댓글 삭제

export const deleteComment = async (body: DeleteCommentParam) => {
	const { postId, commentId } = body;
	const res = await client.delete(`/api/board/${postId}/${commentId}`);
	return res;
};

// 댓글 수정

export interface PutCommentBody {
	postId: number;
	content: string;
	commentId: number;
}

export const putComment = async (body: PutCommentBody) => {
	const { postId, commentId, ...rest } = body;
	console.log(body, 'body');
	const res = await client.put(`/api/board/${postId}/${commentId}`, { ...rest });
	return res;
};
