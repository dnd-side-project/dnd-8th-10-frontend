import React, { ReactElement, useEffect, useState, ReactNode } from 'react';

interface Props {
	bgColor?: string;
	blur?: boolean;
	children: ReactElement;
	overlayClickFn?: () => void;
}

function Overlay({ children, bgColor = 'bg-transparent-30%', blur = false, overlayClickFn }: Props) {
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		setIsAnimating(true);
		return () => setIsAnimating(false);
	}, []);

	return (
		<div>
			<div
				role="presentation"
				onClick={() => {
					if (!children.props.yesFn) {
						setIsAnimating(false);
					}
					if (overlayClickFn) {
						overlayClickFn();
					}
				}}
				className={`translate-x-0 z-50  fixed max-w-[42rem] mx-auto top-0 left-0 bottom-0 right-0 ${bgColor} ${
					blur && 'backdrop-filter backdrop-blur-[0.4rem]'
				}  ${
					!children.props.yesFn &&
					`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`
				}`}
			/>
			{React.cloneElement(children, { isAnimating, setIsAnimating })}
		</div>
	);
}

export default Overlay;
