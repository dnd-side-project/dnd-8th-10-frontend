import client from 'src/app.modules/api/client';

export interface WriteBody {
	postId?: number;
	title: string;
	content: string;
	category: string;
}

export interface WriteImgBody {
	postId: number;
	FormData: FormData;
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
	const res = await client.post(`api/image/upload/${body.postId}`, body.FormData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return res;
};

// 이미지 불러오기
export const boardImgLoad = async (postId: number) => {
	const res = await client.get(`/api/image/view`, { params: { postId } });
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
