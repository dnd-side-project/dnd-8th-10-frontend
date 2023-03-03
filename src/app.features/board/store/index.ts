import create from 'zustand';

interface IStore {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
}

const useStore = create<IStore>((set) => ({
	selectedCategory: '전체',
	setSelectedCategory: (category) => set(() => ({ selectedCategory: category })),
}));

export default useStore;
