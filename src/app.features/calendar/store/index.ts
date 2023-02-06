import create from 'zustand';

interface IStore {
	isOpen: boolean;
	isDay: string;
	modalIsOpen: (isDay: string) => void;
}

const useStore = create<IStore>((set) => ({
	isOpen: false,
	isDay: '',
	modalIsOpen: (isDay) => set((state) => ({ isOpen: true, isDay })),
}));

export default useStore;

// 사용 방법
// `const { isOpen, modalIsOpen } = useStore();` 처럼 구조분해할당 구조로 가져가 사용하면 된다.
