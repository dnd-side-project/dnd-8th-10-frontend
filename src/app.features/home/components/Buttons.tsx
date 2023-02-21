import React from 'react';
import { useRouter } from 'next/router';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import InvenIcon from '../../../../public/images/home/inven.svg';
import CheckIcon from '../../../../public/images/home/check.svg';

function Buttons() {
	const router = useRouter();
	return (
		<div className="flex">
			<div
				role="presentation"
				onClick={() => router.push(`${SERVICE_URL.inventory}`)}
				className="flex flex-col justify-center items-center shadow-blue w-full mr-[1.6rem] py-[2.5rem] rounded-[0.8rem]"
			>
				<InvenIcon />
				<span className="text-subhead2 text-g9 mt-[0.8rem]">시재점검</span>
			</div>
			<div
				// onClick={() => router.push(`${SERVICE_URL.}`)}
				className="flex flex-col justify-center items-center shadow-blue w-full py-[2.5rem] rounded-[0.8rem]"
			>
				<CheckIcon />
				<span className="text-subhead2 text-g9">체크리스트</span>
			</div>
		</div>
	);
}

export default Buttons;
