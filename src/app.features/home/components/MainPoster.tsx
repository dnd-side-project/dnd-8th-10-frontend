import React from 'react';
import MainIcon from '../../../../public/images/home/main.svg';

function MainPoster() {
	return (
		<div className="h-[23.8rem] relative mb-[2.4rem]">
			<div className="pl-[1rem] pt-[4.8rem] absolute">
				<span className="text-g9 text-[2rem]">
					반가워요 🖐️ <br />
					일잘러 <span className="text-primary">최영진님</span> <br />
					오늘도 화이팅!
				</span>
			</div>
			<div className="absolute bottom-0 right-0 ">
				<MainIcon />
			</div>
		</div>
	);
}

export default MainPoster;
