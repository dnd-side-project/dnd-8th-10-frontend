import Link from 'next/link';
import React from 'react';
import Header from 'src/app.components/Header';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Progress from './Progress';

interface Props {
	curPage: number;
	children: React.ReactNode;
	canGoNext: boolean;
}
function RegisterLayout({ curPage, children, canGoNext }: Props) {
	return (
		<>
			<Header title="" />
			<Progress curPage={curPage} />
			<main className=" text-g9   relative pt-[9rem] h-[100vh] overflow-hidden">{children}</main>

			<footer
				aria-disabled={!canGoNext}
				className="aria-disabled:bg-g2 aria-disabled:text-[#A8A8A8] pt-[1.9rem] text-white text-subhead4 h-[8rem] text-center bg-primary fixed max-w-[50rem] mx-auto inset-x-0 bottom-0"
			>
				<Link href={`${SERVICE_URL.register}?page=${curPage + 1}`}>다음으로</Link>
			</footer>
		</>
	);
}

export default RegisterLayout;
