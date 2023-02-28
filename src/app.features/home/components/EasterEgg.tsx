import React, { useEffect, useState } from 'react';
import EggIcon from '../../../../public/images/home/easterEgg/easterEgg.svg';
import BubbleIcon from '../../../../public/images/home/easterEgg/bubble.svg';
function EasterEgg() {
	const [showDiv, setShowDiv] = useState(false);
	const [eggContentIndex, setEggContentIndex] = useState(0);
	const eggContent = [
		'일찍 일어나는 알바가 피곤하다',
		'최저시급은 티끌모아 티끌',
		'최저시급모아 태산',
		'올해 최저시급은 9620원 이래요',
		'과연 내년 최저시급은 얼마나 오를까요',
		'임금체불 신고는 고용노동부 ***-***',
	];
	useEffect(() => {
		const handleResize = () => {
			const windowHeight = window.innerHeight;
			setShowDiv(windowHeight >= 830);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (showDiv) {
			setEggContentIndex(Math.floor(Math.random() * eggContent.length));
		}
	}, [showDiv]);
	return (
		<>
			{showDiv && (
				<div>
					<div className="flex absolute right-0 bottom-0 mb-[4rem] mr-[2rem]">
						<div className="h-[3.6rem] px-[1.6rem] py-[0.8rem] bg-[#F4F5FF] rounded-[2rem] flex justify-center items-center">
							<span className="text-subhead2 text-[#BDC0D3]">{eggContent[eggContentIndex]}</span>
						</div>
						<EggIcon />
					</div>
					<div className="absolute right-[11.5rem] bottom-[0.6rem] mb-[5.6rem]">
						<BubbleIcon />
					</div>
				</div>
			)}
		</>
	);
}

export default EasterEgg;
