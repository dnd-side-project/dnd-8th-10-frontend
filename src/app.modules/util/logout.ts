import { COOKIE_KEY } from '../constants/Cookie';
import { SERVICE_URL } from '../constants/ServiceUrl';

/**
 * 서비스에서 생성한 쿠키 삭제
 */
export const deleteAllCookie = (): void => {
	// TODO: 반복문화 시키기
	document.cookie = `${COOKIE_KEY.ACCESS_TOKEN}=; max-age=-1 ;path=/;`;
	document.cookie = `${COOKIE_KEY.REFRESH_TOKEN}=; max-age=-1 ;path=/;`;
	document.cookie = `${COOKIE_KEY.USER}=; max-age=-1 ;path=/;`;
	document.cookie = `${COOKIE_KEY.STORE}=; max-age=-1 ;path=/;`;
};

/**
 * 로그아웃 후 로그인 페이지로 이동시킴
 */
export const routeToLoginPage = (): void => {
	setTimeout(() => {
		window.location.href = SERVICE_URL.login;
	}, 250); // 사파리 대응
};
