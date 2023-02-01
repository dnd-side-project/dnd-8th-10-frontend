import { userAgent } from 'next/server';
import { PatchUserBody, UserType } from 'src/app.modules/api/user';
import create from 'zustand';

interface IUser {
	type: UserType;
	storeName: string;
	startTime: {
		meridiem: 'am' | 'pm';
		hour: string;
		minute: string;
	};
	endTime: {
		meridiem: 'am' | 'pm';
		hour: string;
		minute: string;
	};
	phoneNumber: string;
}

interface UserState {
	user: IUser;
	initUser: () => void;
	setType: (type: UserType) => void;
	setStoreName: (storeName: string) => void;
	setStartTime: (value: string, name: 'meridiem' | 'hour' | 'minute') => void;
	setPhoneNumber: (phoneNumber: string) => void;
}
const initUser: IUser = {
	type: 'employee',
	storeName: '',
	startTime: {
		meridiem: 'am',
		hour: '1',
		minute: '0',
	},
	endTime: {
		meridiem: 'am',
		hour: '1',
		minute: '0',
	},
	phoneNumber: '',
};
const useRegisterUserStore = create<UserState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setType: (type: UserType) => set((prev) => ({ user: { ...prev.user, type } })),
	setStoreName: (storeName: string) => set((prev) => ({ user: { ...prev.user, storeName } })),
	setStartTime: (value: string, name: 'meridiem' | 'hour' | 'minute') =>
		set((prev) => ({ user: { ...prev.user, startTime: { ...prev.user.startTime, [name]: value } } })),
	setPhoneNumber: (phoneNumber: string) => set((prev) => ({ user: { ...prev.user, phoneNumber } })),
}));

export default useRegisterUserStore;
