import { IUser } from 'src/app.modules/types/user';

export interface IStore {
	storeLocation: string;
	storeName: string;
	userList: IUser[];
}
