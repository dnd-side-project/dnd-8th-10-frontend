import useModalStore from 'src/app.modules/store/modal';

interface Props {
	children: React.ReactElement;
	bgColor?: string;
}

function TopModal({ children, bgColor = 'bg-w' }: Props) {
	const { modalIsClose } = useModalStore();
	return (
<<<<<<< HEAD
		<div className={`${bgColor} rounded-t-[1.6rem] z-10 w-full absolute bottom-0`}>
=======
		<div className={`${bgColor} rounded-t-[1.6rem] z-10  absolute bottom-0 w-[calc(100%+4rem)] -translate-x-[2rem]`}>
>>>>>>> 2ec56cb (design: 1차 UI)
			<div className="flex justify-center mt-[0.8rem] mb-[2.4rem]">
				<button type="button" onClick={() => modalIsClose()} className="w-[5rem] h-[0.4rem] bg-g4 rounded-[1rem]">
					{' '}
				</button>
			</div>
<<<<<<< HEAD
			<div className="p-[2rem]">
=======
			<div className="px-[2rem] pb-[2rem]">
>>>>>>> 2ec56cb (design: 1차 UI)
				<div>{children}</div>
			</div>
		</div>
	);
}

export default TopModal;
