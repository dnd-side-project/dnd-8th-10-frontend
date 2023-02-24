import React, { useEffect, useState } from 'react';
import { IUser } from 'src/app.features/mypage/types';
import { getCookie } from 'src/app.modules/cookie';

function useCookieUser() {
	const [cookieUser, setCookieUser] = useState<IUser>();
	useEffect(() => {
		const tmp = getCookie('USER');
		if (!tmp) return;
		setCookieUser(tmp);
	}, []);
	return { cookieUser };
}

export default useCookieUser;
