import React, { useEffect, useRef, useState } from 'react';
import useRegisterUserStore from '../store';

declare global {
	interface Window {
		kakao: any;
	}
}

type Store = {
	place_name: string;
	road_address_name: string;
};
function SetStoreScreen() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<Store[]>();
	const {
		user: { storeName },
		setStoreName,
	} = useRegisterUserStore();
	const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	const storeNameHandler = (value: string) => {
		setStoreName(value);
	};
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
			// 카카오 맵 API는 검색 할 때, 최대 45개의 결과 값만 알려줍니다
			kakao.maps.load(() => {
				const places = new kakao.maps.services.Places();
				// TODO: 검색결과 45개 다 불러오기. 현재는 1페이지만 보고 있음
				const placesSearchCB = (result: any, status: any, pagination: any) => {
					if (status === kakao.maps.services.Status.OK) {
						const storeRes = result.filter((d: any) => {
							return d.category_group_code === 'CS2';
						});
						setSearchResults(storeRes);
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
				<input
					value={searchTerm}
					onChange={searchTermHandler}
					placeholder="편의점 명을 검색해보세요"
					type="search"
					className="w-[300px] h-[30px] mt-[20px] py-2 px-4  border border-black rounded-lg  "
				/>
			</form>
			<span className="block mt-[12px]">검색 결과</span>
			<ul>
				{searchResults?.map((store, idx) => (
					<li key={idx}>
						<button onClick={() => storeNameHandler(store.place_name)} value={store.place_name}>
							<strong>{store.place_name}</strong> "{store.road_address_name}"
						</button>
					</li>
				))}
			</ul>
			<span className="block mt-[12px]">선택된 편의점 : {storeName}</span>
		</div>
	);
}

export default SetStoreScreen;
