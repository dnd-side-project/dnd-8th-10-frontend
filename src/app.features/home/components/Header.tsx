import React from 'react';
import GpsIcon from '../../../../public/images/home/gps.svg';
import AlarmIcon from 'src/app.modules/assets/home/alarm.svg';
function Header() {
	return (
		<header className="h-[5.6rem] flex justify-between items-center">
			<div className="w-[2.4rem]"></div>
			<div className="flex items-center">
				<GpsIcon />
				<span className="ml-[0.2rem] text-body1 text-g6">00편의점 00지점</span>
			</div>
			<AlarmIcon />
		</header>
	);
}

export default Header;
