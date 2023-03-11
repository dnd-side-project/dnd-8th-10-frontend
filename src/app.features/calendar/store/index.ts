import { transIdx } from 'src/app.modules/util/calendar';
import create from 'zustand';

interface IStore {
	year: number;
	month: number;
	clickDay: string;
	toDay: string;
	workDay: boolean;
	keypad: boolean;
	keypadOpen: () => void;
	keypadClose: () => void;
	modalCalData: (clickDay: string, workDay?: boolean) => void;
	isDayReset: () => void;
	setCalendar: (year: number, month: number) => void;
	recordComplete: boolean;
	setRecordComplete: () => void;
}
const today = new Date();
const useStore = create<IStore>((set) => ({
	year: today.getFullYear(),
	month: today.getMonth(),
	clickDay: '',
	toDay: transIdx(today.getFullYear(), today.getMonth(), today.getDate()),
	workDay: false,
	keypad: false,
	keypadOpen: () => set(() => ({ keypad: true })),
	keypadClose: () => set(() => ({ keypad: false })),
	modalCalData: (clickDay, workDay) => set(() => ({ clickDay, workDay })),
	isDayReset: () => set(() => ({ clickDay: '' })),
	setCalendar: (year, month) => set(() => ({ year, month })),
	recordComplete: false,
	setRecordComplete: () => set((state) => ({ ...state, recordComplete: !state.recordComplete })),
}));

export default useStore;
