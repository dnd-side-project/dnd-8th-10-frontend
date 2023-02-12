import { transIdx } from 'src/app.modules/util/calendar';
import create from 'zustand';

interface IStore {
	year: number;
	month: number;
	isOpen: boolean;
	ClickDay: string;
	toDay: string;
	workDay: boolean;
	modalIsOpen: (ClickDay: string, workDay: boolean) => void;
	modalIsClose: () => void;
	isDayReset: () => void;
	setCalendar: (year: number, month: number) => void;
}
const today = new Date();
const useStore = create<IStore>((set) => ({
	year: today.getFullYear(),
	month: today.getMonth(),
	isOpen: false,
	ClickDay: '',
	toDay: transIdx(today.getFullYear(), today.getMonth(), today.getDate()),
	workDay: false,
	modalIsOpen: (ClickDay, workDay) => set(() => ({ isOpen: true, ClickDay, workDay })),
	modalIsClose: () => set(() => ({ isOpen: false })),
	isDayReset: () => set(() => ({ ClickDay: '' })),
	setCalendar: (year, month) => set(() => ({ year, month })),
}));

export default useStore;
