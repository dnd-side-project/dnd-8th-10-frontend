import React, { ReactElement, useEffect, useState, ReactNode } from 'react';
import useModalStore from 'src/app.modules/store/modal';

interface Props {
	bgColor?: string;
	blur?: boolean;
	children: ReactElement;
}

function Overlay({ children, bgColor = 'bg-transparent-30%', blur = false }: Props) {
	const { modalIsClose, isModalOpen } = useModalStore();
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if (isModalOpen && !children.props.content) {
			setIsAnimating(true);
		}
	}, [isModalOpen]);
	return (
		<div>
			<button
				type="button"
				aria-label="button"
				onClick={() => {
					if (!children.props.content) {
						setIsAnimating(false);
						setTimeout(() => {
							modalIsClose();
						}, 500);
					} else {
						modalIsClose();
					}
				}}
				className={`translate-x-0 z-50  fixed max-w-[42rem] mx-auto top-0 left-0 bottom-0 right-0 ${bgColor} ${
					blur && 'backdrop-filter backdrop-blur-[0.4rem]'
				}  ${
					!children.props.content &&
					`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`
				}`}
			/>
			{React.cloneElement(children, { isAnimating, setIsAnimating })}
		</div>
	);
}

export default Overlay;
