import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import lottie from 'lottie-web';
import mainJson from 'public/lottie/main.json';

function MainIcon() {
	useEffect(() => {
		const container = document.querySelector('#containerMain');
		if (!container) return;
		lottie.loadAnimation({
			container,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: mainJson,
		});
	}, []);
	return <div id="containerMain" />;
}
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
