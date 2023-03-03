import client from 'src/app.modules/api/client';

export interface WriteBody {
	postId?: number;
	title: string;
	content: string;
	category: string;
}

export interface WriteImgBody {
	postId: number;
	files: FormData;
}

// 게시글 카테고리별 조회
export const boardCheckCategory = async (category: string) => {
	const res = await client.get('api/board/category', { params: { category } });
	return res;
};

// 게시글 작성
export const boardWrite = async (body: WriteBody) => {
	const res = await client.post('api/board', { ...body });
	return res;
};

// 게시글 작성 (이미지) RequestPart: form-data, PostId
export const boardWriteImg = async (body: WriteImgBody) => {
	const res = await client.post(
		'api/image/upload',
		{ ...body },
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			transformRequest: (formData) => formData,
		}
	);
	return res;
};

// 게시글 보기
export const boardView = async (postId: number) => {
	const res = await client.get(`/api/board/${postId}`);
	return res;
};

// 게시글 수정
export const boardModify = async (body: WriteBody) => {
	const res = await client.put(`/api/board/${body.postId}`, {
		title: body.title,
		content: body.content,
		category: body.category,
	});
	return res;
};

// 게시글 삭제
export const boardDelete = async (postId: number) => {
	const res = await client.delete(`/api/board/${postId}`);
	return res;
};
