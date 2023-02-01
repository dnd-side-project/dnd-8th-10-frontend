import { PatchUserBody, UserType } from 'src/app.modules/api/user';
import create from 'zustand';

interface UserState {
	user: PatchUserBody;
	initUser: () => void;
	setType: (type: UserType) => void;
	setStoreName: (storeName: string) => void;
	setTime: (time: string) => void;
	setPhoneNumber: (phoneNumber: string) => void;
}
const initUser: PatchUserBody = {
	type: 'employee',
	storeName: '',
	time: '',
	phoneNumber: '',
};
const useRegisterUserStore = create<UserState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setType: (type: UserType) => set((prev) => ({ user: { ...prev.user, type } })),
	setStoreName: (storeName: string) => set((prev) => ({ user: { ...prev.user, storeName } })),
	setTime: (time: string) => set((prev) => ({ user: { ...prev.user, time } })),
	setPhoneNumber: (phoneNumber: string) => set((prev) => ({ user: { ...prev.user, phoneNumber } })),
}));

export default useRegisterUserStore;
