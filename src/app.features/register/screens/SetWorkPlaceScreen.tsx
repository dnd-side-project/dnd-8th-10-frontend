import React, { useEffect, useState } from 'react';
import SearchInput from 'src/app.components/app.base/Input/SearchInput';
import RoadBadgeSvg from 'src/app.modules/assets/register/roadBadge.svg';
import RegisterLayout from '../components/RegisterLayout';
import useRegisterUserStore from '../store';
import { pauseBtnAnim, runningBtnAnim } from '../utils/contolBtnAnim';

declare global {
	interface Window {
		kakao: any;
	}
}

function SetWorkPlaceScreen() {
	const [searchTerm, setSearchTerm] = useState<string>();
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<
		{
			place_name: string;
			road_address_name: string;
		}[]
	>();
	const {
		userForm: { workPlace },
		setWorkPlace,
		setWorkLocation,
	} = useRegisterUserStore();
	const IS_STORE_SELECTED = Boolean(workPlace?.trim());
	const searchTermHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(e.target.value);
	};
	const workPlaceHandler = (place: string, location: string): void => {
		setWorkPlace(place);
		setWorkLocation(location);
		setSearchTerm(place);
		setSearchResults([]);
	};
	const resetSearchTerm = (): void => {
		setWorkPlace('');
		setWorkLocation('');
		setSearchTerm('');
		setSearchResults([]);
	};
	// kakao map script 로드
	useEffect(() => {
		const script = document.createElement('script');
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET_SDK}&libraries=services&autoload=false`;
		document.head.appendChild(script);

		const onLoadKakaoMap = () => {
			setIsLoaded(true);
		};
		script.addEventListener('load', onLoadKakaoMap);

		return () => script.removeEventListener('load', onLoadKakaoMap);
	}, []);
	useEffect(() => {
		if (!isLoaded || !searchTerm?.trim()) return;
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
		<RegisterLayout curPage={2} canGoNext={IS_STORE_SELECTED} guideMessage="어떤 지점에서 일하고 계신가요?">
			<div className="space-y-[2.4rem] pt-[1.6rem]">
				<div className="space-y-[1.6rem] sticky top-0">
					<SearchInput
						searchTerm={searchTerm ?? workPlace ?? ''}
						onSearchTermChange={searchTermHandler}
						resetSearchTerm={resetSearchTerm}
						isSearched={Boolean(workPlace?.trim())}
						placeholder="편의점 지점명, 위치 검색  예)0000점"
						onFocus={runningBtnAnim}
						onBlur={pauseBtnAnim}
					/>
				</div>

				{!IS_STORE_SELECTED && (
					<ul className="space-y-[1.6rem] pb-[12rem]">
						{searchResults?.map((store, idx) => (
							<li key={idx}>
								<button
									onClick={() => workPlaceHandler(store.place_name, store.road_address_name)}
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

export default SetWorkPlaceScreen;
