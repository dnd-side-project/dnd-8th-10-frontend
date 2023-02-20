import { useEffect } from 'react';
import useModalStore from 'src/app.modules/store/modal';

interface Props {
	children: React.ReactElement;
	bgColor?: string;
	isAnimating?: boolean;
	setIsAnimating?: (isAnimating: boolean) => void;
}

function TopModal({ children, bgColor = 'bg-w', isAnimating, setIsAnimating }: Props) {
	const { modalIsClose, isModalOpen } = useModalStore();

	useEffect(() => {
		if (isModalOpen && setIsAnimating) {
			setIsAnimating(true);
		}
	}, [isModalOpen]);

	return (
		<div
			className={`${bgColor} rounded-t-[1.6rem] z-50 fixed bottom-0 max-w-[42rem] -translate-x-[2rem] mx-auto w-full transition-transform duration-500 ease-in-out ${
				isAnimating ? 'transform translate-y-0' : 'transform translate-y-full'
			}`}
		>
			<div className="flex justify-center mt-[0.8rem] mb-[2.4rem]">
				{/* eslint-disable-next-line */}
				<button
					type="button"
					onClick={() => {
						if (setIsAnimating) {
							setIsAnimating(false);
						}
						setTimeout(() => {
							modalIsClose();
						}, 500);
					}}
					className="w-[5rem] h-[0.4rem] bg-g4 rounded-[1rem]"
				/>
			</div>
			<div className="px-[2rem] pb-[2rem]">
				<div>{children}</div>
			</div>
		</div>
	);
}

export default TopModal;
