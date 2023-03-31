import React, { useEffect, useRef } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import KaKaoIcon from 'src/app.modules/assets/login/kakao.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import lottie from 'lottie-web';
import loginJson from 'public/lottie/login2.json';

function LoginJson() {
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const $container = containerRef.current;
		if ($container === null) return;
		lottie.loadAnimation({
			container: $container,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: loginJson,
		});
	}, []);
	return <div ref={containerRef} className="w-full" />;
}

function LoginScreen() {
	console.log(KAKAO_OAUTH2_URL);
	return (
		<div className="h-full relative">
			<div className="pt-[12vh]">
				<h1 className="text-title2 text-g9">
					슬기로운 편의점 생활!
					<br />
					<strong className="text-primary text-title2">슬편생</strong>과 함께
					<br />
					일하러 가볼까요?
				</h1>
				<LoginJson />
			</div>
			<div className="absolute w-full  bottom-[2rem]">
				<Bar bgColor="bg-[#FAE64D]">
					<a
						href={KAKAO_OAUTH2_URL}
						className="text-g10 font-bold text-[1.6rem] flex justify-center items-center gap-[1.2rem]"
					>
						<KaKaoIcon />
						<span>카카오 로그인/회원가입</span>
					</a>
				</Bar>
			</div>
		</div>
	);
}

export default LoginScreen;
