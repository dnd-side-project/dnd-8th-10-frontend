import React from 'react';
import Badge from 'src/app.components/app.base/Button/Badge';
import Divider from 'src/app.components/Divider';
import Header from 'src/app.components/Header';
import InfoBox from 'src/app.components/InfoBox';
import ProfileImage from 'src/app.components/ProfileImage';
import StoreIcon from 'src/app.modules/assets/mypage/store.svg';
import CallingIcon from 'src/app.modules/assets/mypage/calling.svg';
import { getSplittedWorkPlaceString } from 'src/app.modules/util/getSplittedWorkPlaceString';
import { IUser } from '../types';

interface IStore {
	storeLocation: '경기도 수원시 영통구 영통동 1008-1';
	storeName: 'GS25 영통럭키점';
	userList: IUser[];
}

interface Props {
	store: IStore;
}

function MyStoreScreen({ store }: Props) {
	console.log(store);
	return (
		<>
			<Header title={store?.storeName?.split(' ')[1] ?? ''} />
			<main className="h-[100vh] pt-[7.6rem] text-g9">
				<InfoBox className="flex justify-start items-start space-x-[0.8rem] mb-[1.6rem]">
					<StoreIcon className="w-[2.4rem] h-[2.4rem]" />
					<div className="flex flex-col space-y-[0.8rem]">
						<span className="text-subhead3 ">{getSplittedWorkPlaceString(store?.storeName ?? '')}</span>
						<span className="text-body1">{store?.storeLocation ?? ''}</span>
					</div>
				</InfoBox>
				<Divider />
				<div className="py-[2.4rem]">
					<ul className="space-y-[1.6rem] ">
						{store?.userList?.map((item, index) => (
							<li key={index} className="flex items-start justify-between">
								<div className="flex space-x-[0.8rem]">
									<ProfileImage userProfileCode={item.userProfileCode} size="lg" />
									<div className="flex flex-col space-y-[0.4rem]">
										<span className="text-subhead2">{item.userName}</span>
										<ul className="gap-[0.8rem] flex flex-wrap">
											{item.workTime.split(',').map((time, idx) => (
												<li key={`time-${idx}`}>
													<Badge size="small" color="warmGray">
														{time}
													</Badge>
												</li>
											))}
										</ul>
									</div>
								</div>
								<button disabled className="p-[0.8rem] bg-g4 rounded-[0.8rem]">
									<CallingIcon />
								</button>
							</li>
						))}
					</ul>
				</div>
			</main>
		</>
	);
}

export default MyStoreScreen;
