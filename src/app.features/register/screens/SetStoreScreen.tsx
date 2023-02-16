import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import SearchInput from 'src/app.components/Input/SearchInput';
import RoadBadgeSvg from 'src/app.modules/assets/register/roadBadge.svg';
import RegisterLayout from '../components/RegisterLayout';
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
		setSearchResults([]);
		setSearchTerm(value);
		setStoreName(value);
	};
	const resetSearchTerm = () => {
		if (storeName !== null) {
			setStoreName(null);
		}
		setSearchTerm('');
		setSearchResults([]);
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
		<RegisterLayout curPage={2} canGoNext={storeName !== null}>
			<div className="space-y-[2.4rem] ">
				<div className="space-y-[1.6rem]">
					<h1 className="text-g10 text-title2">어떤지점에서 일하고 계신가요?</h1>
					<SearchInput
						searchTerm={searchTerm}
						onSearchTermChange={searchTermHandler}
						resetSearchTerm={resetSearchTerm}
						isSearched={Boolean(storeName?.trim())}
					/>
				</div>

				{storeName === null && (
					<ul className="space-y-[1.6rem] h-[100vh] pb-[32rem] overflow-x-scroll scrollbar-hidden">
						{searchResults?.map((store, idx) => (
							<li key={idx}>
								<button
									onClick={() => storeNameHandler(store.place_name)}
									value={store.place_name}
									className="space-y-[0.4rem] flex flex-col items-start"
								>
									<span className="text-subhead2">{store.place_name}</span>
									<div className="space-x-[0.4rem] flex items-center">
										<RoadBadgeSvg />
										<span className="text-body1">{store.road_address_name}</span>
									</div>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</RegisterLayout>
	);
}

export default SetStoreScreen;
