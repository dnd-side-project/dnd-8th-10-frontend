import { IUser } from 'src/app.modules/types/user';
import { WorkTimeType } from 'src/app.modules/types/workTime';
import create from 'zustand';

type UserFormType = Partial<IUser> & { workTime?: WorkTimeType }; // workTime -> 가공 전 상태

interface IState {
	user: UserFormType;
	initUser: () => void;
	setRole: (role: IUser['role']) => void;
	setWorkPlace: (workPlace: IUser['workPlace']) => void;
	setWorkLocation: (workLocation: IUser['workLocation']) => void;
	setTime: (workTime: UserFormType['workTime']) => void;
	setPhoneNumber: (phoneNumber: IUser['phoneNumber']) => void;
	setWage: (wage: IUser['wage']) => void;
}

const initUser: UserFormType = {};
// TODO: 이름 다시 짓기
export const INIT_WORKTIME = {} as WorkTimeType;

const useRegisterUserStore = create<IState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setRole: (role) => set((prev) => ({ user: { ...prev.user, role } })),
	setWorkPlace: (workPlace) => set((prev) => ({ user: { ...prev.user, workPlace } })),
	setWorkLocation: (workLocation) => set((prev) => ({ user: { ...prev.user, workLocation } })),
	setTime: (workTime) => set((prev) => ({ user: { ...prev.user, workTime } })),
	setPhoneNumber: (phoneNumber) => set((prev) => ({ user: { ...prev.user, phoneNumber } })),
	setWage: (wage) => set((prev) => ({ user: { ...prev.user, wage } })),
}));

export default useRegisterUserStore;
