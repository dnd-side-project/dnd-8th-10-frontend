import { useEffect, useRef, useState } from 'react';
import useModalStore from 'src/app.modules/store/modal';

interface Props {
	children: React.ReactElement;
	bgColor?: string;
	isAnimating?: boolean;
	setIsAnimating?: (isAnimating: boolean) => void;
}

function TopModal({ children, bgColor = 'bg-w', isAnimating, setIsAnimating }: Props) {
	const { modalIsClose, isModalOpen } = useModalStore();
	const [height, setHeight] = useState<number>(0);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStartY, setDragStartY] = useState(0);
	const [dragOffsetY, setDragOffsetY] = useState(0);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isModalOpen && setIsAnimating) {
			setIsAnimating(true);
		}
		const _ = setTimeout(() => {
			if (modalRef.current) {
				setHeight(modalRef.current.getBoundingClientRect().height + 36);
			}
			clearTimeout(_);
		}, 100);
	}, [isModalOpen]);

	useEffect(() => {
		const modal = modalRef.current;
		if (modal && isDragging) {
			const handleMouseMove = (event: MouseEvent) => {
				setDragOffsetY(Math.max(event.pageY - dragStartY, 0));
			};

			const handleMouseUp = () => {
				setIsDragging(false);
				if (dragOffsetY > 50) {
					if (setIsAnimating) {
						setIsAnimating(false);
					}
					setTimeout(() => {
						modalIsClose();
					}, 500);
				} else {
					setDragOffsetY(0);
				}
			};

			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}
		return undefined;
	}, [isDragging, dragStartY, dragOffsetY, modalIsClose, height]);

	const handleMouseDown = (event: React.MouseEvent) => {
		event.preventDefault();
		setIsDragging(true);
		setDragStartY(event.pageY);
	};

	return (
		<div
			className={`${bgColor} h-full rounded-t-[1.6rem] z-50 fixed bottom-0 max-w-[42rem] -translate-x-[2rem] mx-auto w-full transition-transform duration-500 ease-in-out ${
				isAnimating ? 'transform translate-y-0' : 'transform translate-y-full'
			}`}
			style={{ height: `calc(${height}px - ${dragOffsetY}px)` }}
		>
			<div className="flex justify-center mt-[0.8rem] mb-[2.4rem]">
				{/* eslint-disable-next-line */}
				<button
					onMouseDown={handleMouseDown}
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
			<div ref={modalRef} className="px-[2rem] pb-[2rem]">
				<div>{children}</div>
			</div>
		</div>
	);
}

export default TopModal;
