import { transIdx } from 'src/app.modules/util/calendar';
import create from 'zustand';

interface IStore {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
}

const useStore = create<IStore>((set) => ({
	selectedCategory: '',
	setSelectedCategory: (category) => set(() => ({ selectedCategory: category })),
}));

export default useStore;
