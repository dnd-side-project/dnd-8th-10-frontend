import client from 'src/app.modules/api/client';
import { IComment, PostDatas } from '../types';

// 게시글 체크
export const postViewCheck = async (postId: PostDatas['postId']) => {
	const res = await client.post(`/api/board/${postId}/check`);
	return res;
};

export type PostCommentBodyType = Pick<PostDatas, 'postId'> & Pick<IComment, 'content'> & { email?: string[] }; // 멘션할 이메일

// 게시글 체크한 사람 조회
export const getViewCheckPerson = async (postId: PostDatas['postId']) => {
	const res = await client.get(`/api/board/${postId}/check`);
	return res;
};

// 댓글 작성
export const postComment = async (body: PostCommentBodyType) => {
	const { postId, ...rest } = body;
	const res = await client.post(`/api/board/${postId}/comment`, { ...rest });
	return res;
};
export type DeleteCommentParamType = Pick<PostDatas, 'postId'> & Pick<IComment, 'commentId'>;
// 댓글 삭제

export const deleteComment = async (body: DeleteCommentParamType) => {
	const { postId, commentId } = body;
	const res = await client.delete(`/api/board/${postId}/${commentId}`);
	return res;
};

// 댓글 수정

export type PutCommentBodyType = Pick<PostDatas, 'postId'> & Pick<IComment, 'content' | 'commentId'>;

export const putComment = async (body: PutCommentBodyType) => {
	const { postId, commentId, ...rest } = body;
	const res = await client.put(`/api/board/${postId}/${commentId}`, { ...rest });
	return res;
};
