import React, { useEffect, useRef, useState } from 'react';

declare global {
	interface Window {
		kakao: any;
	}
}

type Store = {
	place_name: string;
	road_address_name: string;
};
function register() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [stores, setStores] = useState<Store[]>();
	const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		setSearchTerm(e.target.value);
	};
	/* const scriptRef = useRef<HTMLScriptElement>(document.createElement('script'));
	useEffect(() => {
		scriptRef.current.async = true;
		scriptRef.current.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET_SDK}&libraries=services&autoload=false`;
		document.head.appendChild(scriptRef.current);
		script.addEventListener('load', onLoadKakaoMap);

		return () => script.removeEventListener('load', onLoadKakaoMap);
	}, []); */
	/*	useEffect(() => {
		const script = document.createElement('script');
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
				places.keywordSearch(searchTerm, placesSearchCB);
			});
		};
		script.addEventListener('load', onLoadKakaoMap);

		return () => script.removeEventListener('load', onLoadKakaoMap);
	}, [searchTerm]); */
	useEffect(() => {
		const script = document.createElement('script');
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET_SDK}&libraries=services&autoload=false`;
		document.head.appendChild(script);

		const onLoadKakaoMap = () => {
			setIsLoaded(true);
			console.log('is loaded');
		};
		script.addEventListener('load', onLoadKakaoMap);

		return () => script.removeEventListener('load', onLoadKakaoMap);
	}, []);
	useEffect(() => {
		if (!isLoaded || !searchTerm.trim()) return;
		const onLoadKakaoMap = () => {
			const { kakao } = window;
			kakao.maps.load(() => {
				const places = new kakao.maps.services.Places();
				const placesSearchCB = (result: any, status: any, pagination: any) => {
					if (status === kakao.maps.services.Status.OK) {
						const res = result.filter((d: any) => {
							console.log(d.category_group_code, d.category_group_code === 'CS2');
							return d.category_group_code === 'CS2';
						});
						console.log(res, res.category_group_code);
						setStores(res);
					}
				};
				places.keywordSearch(searchTerm, placesSearchCB);
			});
		};
		onLoadKakaoMap();
	}, [isLoaded, searchTerm]);
	return (
		<div>
			<form>
				<input value={searchTerm} onChange={searchTermHandler} type="search" className="w-full" />
			</form>
			<ul>
				{stores?.map((store, idx) => (
					<li key={idx}>
						{store.place_name} {store.road_address_name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default register;
