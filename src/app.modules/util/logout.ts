import { COOKIE_KEY } from '../constants/Cookie';
import { SERVICE_URL } from '../constants/ServiceUrl';

export const deleteAllCookie = () => {
	// TODO: 반복문화 시키기
	document.cookie = `${COOKIE_KEY.ACCESS_TOKEN}=; max-age=-1 ;path=/;`;
	document.cookie = `${COOKIE_KEY.REFRESH_TOKEN}=; max-age=-1 ;path=/;`;
	document.cookie = `${COOKIE_KEY.USER}=; max-age=-1 ;path=/;`;
	document.cookie = `${COOKIE_KEY.STORE}=; max-age=-1 ;path=/;`;
};
export const routeToLoginPage = () => {
	console.log('로그아웃');
	setTimeout(() => {
		window.location.href = SERVICE_URL.login;
	}, 250);
};
