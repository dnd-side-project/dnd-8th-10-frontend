import { useRouter } from 'next/router';
import React from 'react';
import AlarmIcon from 'src/app.modules/assets/home/alarm.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import GpsIcon from '../../../../public/images/home/gps.svg';

function Header() {
	const router = useRouter();
	return (
		<header className="bg-[#FCFCFF] h-[5.6rem] fixed px-[2rem] max-w-[42rem] -translate-x-[2rem] text-subhead4  mx-auto w-full flex justify-between items-center z-50">
			<div className="w-[2.4rem]" />
			<div className="flex items-center">
				<GpsIcon />
				<span className="ml-[0.2rem] text-body1 text-g6">00편의점 00지점</span>
			</div>
			<button className="relative" type="button" onClick={() => router.push(SERVICE_URL.alarm)}>
				<AlarmIcon />
				<div className="w-[0.6rem] h-[0.6rem] bg-secondary rounded-[50%] absolute right-0 top-0"></div>
			</button>
		</header>
	);
}

export default Header;
