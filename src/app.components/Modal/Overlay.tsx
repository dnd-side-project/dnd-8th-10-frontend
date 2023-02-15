import useModalStore from 'src/app.modules/store/modal';

interface Props {
	bgColor?: string;
	blur?: boolean;
}

function Overlay({ bgColor = 'bg-transparent-20%', blur = false }: Props) {
	const { modalIsClose } = useModalStore();
	return (
		<div>
			<button
				type="button"
				aria-label="button"
				onClick={() => modalIsClose()}
				className={`z-999 fixed top-0 left-0 bottom-0 right-0 ${bgColor} ${
					blur && 'backdrop-filter backdrop-blur-[0.4rem]'
				}`}
			/>
		</div>
	);
}

export default Overlay;
