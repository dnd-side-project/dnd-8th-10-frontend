import { RoleType } from 'src/app.modules/api/user';

export interface PostDatas {
	postId: number;
	title: string;
	content: string;
	category: string;
	checkCount: number;
	userName: string;
	role: string;
	createDate: string;
	modifiedDate: string;
}
// TODO: roletype 정의 위치 바꾸기
export interface IComment {
	commentId: number;
	content: string;
	createdDate: string; // '2023-03-02T10:47:26';
	modifiedDate: string; // '2023-03-02T10:47:26';
	role: RoleType;
	userProfileCode: number;
	userName: string;
}

export interface IBoardViewData {
	category: string;
	checkCount: number;
	comments: IComment[];
	content: string;
	createDate: string;
	modifiedDate: string;
	postId: number;
	role: string;
	title: string;
	userCode: number;
	userName: string;
	viewCount: number;
	check: boolean;
}
// TODO: 이름바꾸기
export interface IBoardCheckPerson {
	userProfileCode: number;
	userName: string;
	email: string;
	userCode: string;
}
