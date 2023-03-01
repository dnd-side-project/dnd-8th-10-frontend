import React, { useEffect } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import LoginGraphic from 'src/app.modules/assets/login/login.svg';
import KaKaoIcon from 'src/app.modules/assets/login/kakao.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import lottie from 'lottie-web';
import loginJson from 'public/lottie/login2.json';

function Jsontest3() {
	useEffect(() => {
		const container = document.querySelector('#container3');
		if (!container) return;
		lottie.loadAnimation({
			container,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: loginJson,
		});
	}, []);
	return <div id="container3" className="w-full " />;
}
function LoginScreen() {
	return (
		<div className=" pt-[16vh]  h-[100vh] relative">
			<div className="space-y-[3.7rem] ">
				<h1 className="text-title2 text-g9">
					슬기로운 편의점 생활!
					<br />
					<strong className="text-primary text-title2">슬편생</strong>과 함께
					<br />
					일하러 가볼까요?
				</h1>
				<Jsontest3 />
			</div>
			<div className="absolute bottom-[2rem] w-full">
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
/*

	<Bar>
				<a href={KAKAO_OAUTH2_URL}>테스트용 카카오로그인 버튼</a>
			</Bar>

*/
