import React from 'react';
import BackIcon from 'src/app.modules/assets/back.svg';
import { Router, useRouter } from 'next/router';

interface Props {
	title: string;
	mode?: 'dark' | 'white';
}
function Header({ title, mode }: Props) {
	const router = useRouter();
	return (
		<header
			className={` h-[5.6rem] fixed flex px-[2rem] max-w-[50rem] -translate-x-[2rem] mx-auto w-full items-center justify-center  z-50 ${
				mode === 'white' ? 'text-w' : 'text-g10 bg-w'
			}`}
		>
			<button onClick={() => router.back()} className="absolute left-[2rem] ">
				<BackIcon stroke={`${mode === 'white' ? '#ffffff' : '#66666E'}`} />
			</button>
			<h1 className="text-subhead4">{title}</h1>
		</header>
	);
}

export default Header;
