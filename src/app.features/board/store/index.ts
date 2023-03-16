import create from 'zustand';

interface IStore {
	selectedCategory: string;
	imgData: File[];
	setSelectedCategory: (category: string) => void;
	setImgFormData: (img: File[]) => void;
}

const useStore = create<IStore>((set) => ({
	selectedCategory: '전체',
	imgData: [],
	setSelectedCategory: (category) => set(() => ({ selectedCategory: category })),
	setImgFormData: (img) =>
		set((state) => ({
			...state,
			imgData: [...state.imgData, ...img],
		})),
}));

export default useStore;
