import React from 'react';
import { KAKAO_OAUTH2_URL } from 'src/app.features/login/constants';
import LoginGraphic from 'src/app.modules/assets/login/login.svg';

function LoginScreen() {
	return (
		<div className="space-y-[9.5rem] pt-[13rem] pb-[6rem]">
			<div className="space-y-[3.7rem] ">
				<h1 className="text-title2 text-g9">
					슬기로운 편의점 생활!
					<br />
					<strong className="text-primary text-title2">슬편생</strong>과 함께
					<br />
					일하러 가볼까요?
				</h1>

				<LoginGraphic className="mx-auto " />
			</div>
			<button className="bg-yellow-400 rounded p-2 text-center mx-auto">
				<a href={KAKAO_OAUTH2_URL}>테스트용 카카오로그인 버튼</a>
			</button>
		</div>
	);
}

export default LoginScreen;
