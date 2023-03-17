import React from 'react';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import Link from 'next/link';
import InvenIcon from '../../../../public/images/home/inven.svg';
import CheckIcon from '../../../../public/images/home/check.svg';

function Shortcut() {
	return (
		<div className="flex mb-[3.2rem] text-subhead2 text-g9 bg-w">
			<Link
				href={SERVICE_URL.inventory}
				className="flex flex-col justify-center items-center shadow-blue w-full h-[15.4rem] mr-[1.6rem] py-[2.5rem] rounded-[0.8rem]"
			>
				<InvenIcon />
				<span>시재점검</span>
			</Link>
			<Link
				href={SERVICE_URL.checklist}
				className="flex flex-col justify-center items-center shadow-blue w-full py-[2.5rem] rounded-[0.8rem]"
			>
				<CheckIcon />
				<span>내 할일 점검</span>
			</Link>
		</div>
	);
}

export default Shortcut;
