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
				<div className="py-[2.4rem] space-y-[2.4rem]">
					<div className="space-y-[0.8rem]">
						<span className=" text-g6 text-subhead1">점장</span>
						<ul className="space-y-[1.6rem] ">
							{store?.userList
								?.filter((item) => item.role === 'MANAGER')
								.map((item, index) => (
									<li key={index} className="flex items-start justify-between">
										<div className="flex space-x-[0.8rem]">
											<ProfileImage userProfileCode={item.userProfileCode} size="lg" />
											<div className="flex flex-col space-y-[0.4rem]">
												<span className="text-subhead2">{item.userName}</span>
												<ul className="gap-[0.8rem] flex flex-wrap">
													{item.workTime.split(',').map((time, idx) => (
														<li key={`time-${idx}`}>
															<Badge size="small" color="warmGray">
																<span className="text-body1">{time}</span>
															</Badge>
														</li>
													))}
												</ul>
											</div>
										</div>
										<a
											href={`tel:${item.phoneNumber}`}
											aria-disabled={!item.phoneNumber}
											className="  p-[0.8rem] bg-g4 aria-disabled:bg-g1 rounded-[0.8rem]"
										>
											<CallingIcon />
										</a>
									</li>
								))}
						</ul>
					</div>
					<div className="space-y-[0.8rem]">
						<span className=" text-g6 text-subhead1">알바생</span>
						<ul className="space-y-[1.6rem] ">
							{store?.userList
								?.filter((item) => item.role === 'WORKER')
								.map((item, index) => (
									<li key={index} className="flex items-start justify-between">
										<div className="flex space-x-[0.8rem]">
											<ProfileImage userProfileCode={item.userProfileCode} size="lg" />
											<div className="flex flex-col space-y-[0.4rem]">
												<span className="text-subhead2">{item.userName}</span>
												<ul className="gap-[0.8rem] flex flex-wrap">
													{item.workTime.split(',').map((time, idx) => (
														<li key={`time-${idx}`}>
															<Badge size="small" color="warmGray">
																<span className="text-body1">{time}</span>
															</Badge>
														</li>
													))}
												</ul>
											</div>
										</div>
										<button disabled={!item.phoneNumber} className="p-[0.8rem] bg-g4 disabled:bg-g1 rounded-[0.8rem]">
											<CallingIcon />
										</button>
									</li>
								))}
						</ul>
					</div>
				</div>
			</main>
		</>
	);
}

export default MyStoreScreen;
