import { MutateUserBody, RoleType } from 'src/app.modules/api/user';
import { WorkTimeType } from 'src/app.modules/types/workTime';
import create from 'zustand';

// TODO: 백엔드 용어랑 통일시키기
interface IUser {
	role: MutateUserBody['role'] | null;
	workPlace: MutateUserBody['workPlace'] | null;
	workLocation: MutateUserBody['workLocation'] | null;
	workTime: WorkTimeType;
	phoneNumber: MutateUserBody['phoneNumber'] | null;
	wage: MutateUserBody['wage'] | null;
}

interface IState {
	user: IUser;
	initUser: () => void;
	setRole: (role: RoleType) => void;
	setWorkPlace: (workPlace: string | null) => void;
	setWorkLocation: (workLocation: string | null) => void;
	setTime: (workTime: WorkTimeType) => void;
	setPhoneNumber: (phoneNumber: string | null) => void;
	setWage: (wage: number | null) => void;
}

const initUser: IUser = {
	role: null,
	workPlace: null,
	workLocation: null,
	workTime: {} as WorkTimeType,
	phoneNumber: null,
	wage: null,
};
// TODO: 이름 다시 짓기
export const INIT_WORKTIME = {} as WorkTimeType;

const useRegisterUserStore = create<IState>((set) => ({
	user: initUser,
	initUser: () => set(() => ({ user: initUser })),
	setRole: (role: RoleType) => set((prev) => ({ user: { ...prev.user, role } })),
	setWorkPlace: (workPlace: string | null) => set((prev) => ({ user: { ...prev.user, workPlace } })),
	setWorkLocation: (workLocation: string | null) => set((prev) => ({ user: { ...prev.user, workLocation } })),
	setTime: (workTime: WorkTimeType) => set((prev) => ({ user: { ...prev.user, workTime } })),
	setPhoneNumber: (phoneNumber: string | null) => set((prev) => ({ user: { ...prev.user, phoneNumber } })),
	setWage: (wage: number | null) => set((prev) => ({ user: { ...prev.user, wage } })),
}));

export default useRegisterUserStore;
