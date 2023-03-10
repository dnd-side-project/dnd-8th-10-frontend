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
interface Props {
	userName: string;
}
function MainPoster({ userName }: Props) {
	return (
		<div className="h-[23.8rem] relative mb-[2.4rem]">
			<div className="pl-[1rem] pt-[4.8rem] absolute">
				<span className="text-g9 text-[2rem]">
					λ°κ°μμ ποΈ <br />
					μΌμλ¬ <span className="text-primary">{userName}λ</span> <br />
					μ€λλ νμ΄ν!
				</span>
			</div>
			<div className="absolute bottom-0 right-0 ">
				<MainIcon />
			</div>
		</div>
	);
}

export default MainPoster;
