import React, { useEffect, useState } from 'react';

declare global {
	interface Window {
		kakao: any;
	}
}

function register() {
	useEffect(() => {
		const script = document.createElement('script');

		script.async = true;
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET_SDK}&libraries=services&autoload=false`;

		document.head.appendChild(script);

		const onLoadKakaoMap = () => {
			const { kakao } = window;
			kakao.maps.load(() => {
				const places = new kakao.maps.services.Places();
				const placesSearchCB = (result: any, status: any, pagination: any) => {
					console.log('callbakc', result, status);
					if (status === kakao.maps.services.Status.OK) {
						const res = result.filter((d: any) => d.category_group_code === 'CS2');
						console.log(res);
					}
				};
				places.keywordSearch('지에스신촌', placesSearchCB);
			});
		};
		script.addEventListener('load', onLoadKakaoMap);

		return () => script.removeEventListener('load', onLoadKakaoMap);
	}, []);

	return <div>{}</div>;
}

export default register;
