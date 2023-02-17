import React from 'react';

interface Props {
	curPage: number;
}
function progress({ curPage }: Props) {
	return (
		<ul className="bg-white  z-50  -translate-x-[2rem] fixed top-[5.6rem] w-full max-w-[40rem] flex space-x-[0.2rem]">
			{[1, 2, 3, 4].map((page) => (
				<li key={page} className={` ${page <= curPage ? 'bg-primary' : 'bg-g2'}  h-[0.2rem] w-full `} />
			))}
		</ul>
	);
}

export default progress;
