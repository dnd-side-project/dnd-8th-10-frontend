import React from 'react';
import BackIcon from 'src/app.modules/assets/arrowLeft.svg';
import { Router, useRouter } from 'next/router';

interface Props {
	title: string;
	children?: React.ReactNode;
}
function Header({ title, children }: Props) {
	const router = useRouter();
	return (
		<header className="w-full h-[5.6rem] flex items-center justify-center relative">
			<button onClick={() => router.back()} className="absolute left-0 ">
				<BackIcon className="" />
			</button>
			<h1 className="text-subhead4">{title}</h1>
			{children}
		</header>
	);
}

export default Header;
