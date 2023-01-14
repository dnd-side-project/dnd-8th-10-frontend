import create from 'zustand';

interface IStore {
	isDark: boolean;
	handleIsDark: () => void;
}

const useStore = create<IStore>((set) => ({
	isDark: false,
	handleIsDark: () => set((state) => ({ isDark: !state.isDark })),
}));

export default useStore;

// 사용 방법
// `const { isDark, handleIsDark } = useStore();` 처럼 구조분해할당 구조로 가져가 사용하면 된다.
