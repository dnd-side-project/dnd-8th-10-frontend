import React from 'react';
import Divider from 'src/app.components/Divider';
import Header from 'src/app.components/Header';
import InfoBox from 'src/app.components/InfoBox';
import StoreIcon from 'src/app.modules/assets/mypage/store.svg';
import { getBrandAndBranchString } from 'src/app.modules/util/getBrandAndBranchString';
import { IStore } from '../types';
import StoreMemberList from '../components/StoreMemberList';

interface Props {
	store: IStore;
}

function MyStoreScreen({ store }: Props) {
	const BRANCH = store?.storeName?.split(' ')[1] ?? '';
	return (
		<>
			<Header title={BRANCH} />
			<main className=" mx-[-2rem] overflow-x-hidden pt-[7.6rem] text-g9">
				<InfoBox className="flex  mx-[2rem] justify-start items-start space-x-[0.8rem] mb-[2rem]">
					<StoreIcon className="w-[2.4rem] h-[2.4rem]" />
					<div className="flex flex-col space-y-[0.8rem]">
						<span className="text-subhead3 ">{getBrandAndBranchString(store?.storeName ?? '')}</span>
						<span className="text-body1">{store?.storeLocation ?? ''}</span>
					</div>
				</InfoBox>

				<div className=" px-[2rem]">
					<Divider />
					<div className="py-[2.4rem] space-y-[2.4rem]">
						<StoreMemberList
							userRole="MANAGER"
							memberList={store?.userList?.filter((item) => item.role === 'MANAGER')}
						/>
						<StoreMemberList userRole="WORKER" memberList={store?.userList?.filter((item) => item.role === 'WORKER')} />
					</div>
				</div>
			</main>
		</>
	);
}

export default MyStoreScreen;
