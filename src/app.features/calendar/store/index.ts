import { transIdx } from 'src/app.modules/util/calendar';
import create from 'zustand';

interface IStore {
	isOpen: boolean;
	isDay: string;
	toDay: string;
	workDay: boolean;
	modalIsOpen: (isDay: string, workDay: boolean) => void;
	modalIsClose: () => void;
	isDayReset: () => void;
}

const useStore = create<IStore>((set) => ({
	isOpen: false,
	isDay: '',
	toDay: transIdx(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
	workDay: false,
	modalIsOpen: (isDay, workDay) => set(() => ({ isOpen: true, isDay, workDay })),
	modalIsClose: () => set(() => ({ isOpen: false })),
	isDayReset: () => set(() => ({ isDay: '' })),
}));

export default useStore;
