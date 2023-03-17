import React from 'react';
import MainIcon from '../../../../public/images/home/main.svg';

interface Props {
	userName: string;
}
function MainPoster({ userName }: Props) {
	return (
		<div className="h-[23.8rem] relative mb-[2.4rem]">
			<div className="pt-[6.1rem] absolute">
				<span className="text-g9 text-[2rem] font-medium">
					반가워요 🖐️ <br />
					일잘러 <span className="text-primary text-title2">{userName}님</span> <br />
					오늘도 화이팅!
				</span>
			</div>
			<div className="absolute bottom-0 right-0">
				<MainIcon />
			</div>
		</div>
	);
}

export default MainPoster;
