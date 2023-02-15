import React from 'react';
import BackIcon from 'src/app.modules/assets/back.svg';
import { Router, useRouter } from 'next/router';

interface Props {
	title: string;
}
function Header({ title }: Props) {
	const router = useRouter();
	return (
		<header className=" h-[5.6rem] fixed flex px-[2rem] max-w-[50rem] mx-auto w-full items-center justify-center bg-white z-50 ">
			<button onClick={() => router.back()} className="absolute left-0 ">
				<BackIcon className="" />
			</button>
			<h1 className="text-subhead4">{title}</h1>
		</header>
	);
}

export default Header;
