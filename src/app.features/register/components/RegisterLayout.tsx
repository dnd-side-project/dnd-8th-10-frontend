import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React from 'react';
import Header from 'src/app.components/Header';
import TopModal from 'src/app.components/Modal/TopModal';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Progress from './Progress';

interface Props {
	curPage: number;
	children: React.ReactNode;
	canGoNext: boolean;
	registerUser?: () => void;
}
function RegisterLayout({ curPage, children, canGoNext, registerUser }: Props) {
	const router = useRouter();
	const nextHandler = () => {
		if (curPage === 4 && registerUser) {
			registerUser();
		} else {
			router.push(`${SERVICE_URL.register}?page=${curPage + 1}`);
		}
	};
	return (
		<>
			<Header title="" />
			<Progress curPage={curPage} />
			<main className=" text-g9   relative pt-[9rem] h-[100vh] overflow-x-visible  overflow-y-hidden">{children}</main>

			<button
				disabled={!canGoNext}
				onClick={nextHandler}
				className="disabled:bg-g1 disabled:text-g4 pt-[1.9rem] pb-[4.3rem] text-white text-subhead4 h-[8rem] text-center bg-primary fixed max-w-[42rem] mx-auto inset-x-0 bottom-0"
			>
				다음으로
			</button>
		</>
	);
}

export default RegisterLayout;
