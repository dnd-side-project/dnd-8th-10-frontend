export interface PostData {
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

export interface boardViewData {
	category: string;
	checkCount: number;
	comments: string[];
	content: string;
	createDate: string;
	modifiedDate: string;
	postId: number;
	role: string;
	title: string;
	userCode: number;
	userName: string;
	viewCount: number;
}
