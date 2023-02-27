import { Router, useRouter } from 'next/router';
import React, { useRef } from 'react';
import Header from 'src/app.components/Header';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Progress from './Progress';

interface Props {
	curPage: number;
	children: React.ReactNode;
	canGoNext: boolean;
}
function RegisterLayout({ curPage, children, canGoNext }: Props) {
	const router = useRouter();
	const nextHandler = () => {
		router.push(`${SERVICE_URL.register}?page=${curPage + 1}`);
	};

	return (
		<>
			<Header title={(router?.query?.title as string) ?? ''} />
			{!router?.query?.title && <Progress curPage={curPage} />}
			<main
				className={`${
					router?.query?.title ? 'pt-[7.2rem]' : 'pt-[9rem]'
				}  text-g9   relative  h-[100vh] overflow-x-visible  overflow-y-hidden`}
			>
				{children}
			</main>
			{router?.query?.title ? (
				<button
					id="saveBtn"
					className="bg-primary disabled:bg-g1 disabled:text-g4 text-w  h-[6rem] min-h-[6rem] text-subhead4  resizing-button"
				>
					저장
				</button>
			) : (
				<button
					disabled={!canGoNext}
					onClick={nextHandler}
					className="disabled:bg-g1 disabled:text-g4 pt-[1.9rem] pb-[4.3rem] text-white text-subhead4 h-[8rem] text-center bg-primary fixed max-w-[42rem] mx-auto inset-x-0 bottom-0"
				>
					다음으로
				</button>
			)}
		</>
	);
}

export default RegisterLayout;
