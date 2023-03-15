import React from 'react';
import BackIcon from 'src/app.modules/assets/back.svg';
import { Router, useRouter } from 'next/router';

interface Props {
	title: string;
	mode?: 'dark' | 'white';
	children?: React.ReactNode;
	onBack?: () => void;
}
function Header({ title, mode, children, onBack }: Props) {
	const router = useRouter();
	return (
		<header
			className={` h-[5.6rem]  fixed flex px-[2rem] max-w-[50rem] -translate-x-[2rem] text-subhead4  mx-auto w-full items-center justify-center  z-[200] ${
				mode === 'white' ? 'text-w' : 'text-g10 bg-w'
			}`}
		>
			<button
				onClick={() => {
					if (onBack) {
						onBack();
					}
					router.back();
				}}
				className="absolute left-[2rem] top-1/2 -translate-y-1/2"
			>
				<BackIcon stroke={`${mode === 'white' ? '#ffffff' : '#66666E'}`} />
			</button>
			<h1 className="text-subhead4">{title}</h1>
			<div className="absolute right-[2rem] top-1/2 -translate-y-1/2">{children}</div>
		</header>
	);
}

export default Header;
