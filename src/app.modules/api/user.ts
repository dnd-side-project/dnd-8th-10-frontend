// TODO: api 나오면 맞게 수정
export type UserType = 'employee' | 'employer';
export interface PatchUserBody {
	type: UserType;
	storeName: string;
	time: string;
	phoneNumber: string;
}
