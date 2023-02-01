import { Cookies } from 'react-cookie';

interface ISetRemoveCookieOption {
	path?: string;
	expires?: Date;
	maxAge?: number;
	domain?: string;
	secure?: boolean;
	httpOnly?: boolean;
	sameSite?: boolean | 'none' | 'lax' | 'strict';
}

interface IGetCookieOption {
	doNotParse?: boolean;
}

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: ISetRemoveCookieOption) => {
	return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string, option?: IGetCookieOption) => {
	return cookies.get(name, { ...option });
};

export const removeCookie = (name: string, option?: ISetRemoveCookieOption) => {
	return cookies.remove(name, { ...option });
};
