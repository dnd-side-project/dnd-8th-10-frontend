import Link from 'next/link';
import React from 'react';
import Badge from 'src/app.components/app.base/Button/Badge';
import Divider from 'src/app.components/Divider';
import Header from 'src/app.components/Header';
import InfoBox from 'src/app.components/InfoBox';
import ProfileImage from 'src/app.components/ProfileImage';

import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { InventoryHistoryType } from '../types';

interface Props {
	inventoryHistory: InventoryHistoryType[];
}
function InventoryScreen({ inventoryHistory }: Props) {
	const LINKS = [
		{
			name: '담배',
			imageRender: "before:content-[url('/images/inventory/cigarette.svg')]",
			url: SERVICE_URL.inventoryCigarette,
		},
		{
			name: '쓰레기 봉투',
			imageRender: "before:content-[url('/images/inventory/garbagebag.svg')]",
			url: SERVICE_URL.inventoryBag,
		},
		{
			name: '문화 상품권',
			imageRender: "before:content-[url('/images/inventory/giftcard.svg')]",
			url: SERVICE_URL.inventoryCard,
		},
	];
	console.log(inventoryHistory);
	return (
		<>
			<Header title="시재 점검" />

			<main className="pt-[7.2rem]  mx-[-2rem] overflow-x-visible   text-g9 ">
				<section className=" pt-[1.6rem] mx-[2rem] pb-[2.4rem] space-y-[1.2rem]">
					<div className="flex items-center justify-start space-x-[0.8rem]">
						<h1 className="text-subhead4 ">시재 항목</h1>

						<span className="text-g8 text-subhead1">점검하고자하는 시재를 선택하세요.</span>
					</div>

					<ul className="text-subhead1 flex justify-between space-x-[0.8rem] ">
						{LINKS.map((item, index) => (
							<li key={index} className="w-full h-[10.2rem] bg-g1 rounded-[0.8rem] grid place-content-center">
								<Link href={item.url}>
									<div className={`${item.imageRender}  flex flex-col justify-center items-center`}>
										<span>{item.name}</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</section>
				<div className="px-[2rem]">
					<Divider />
				</div>
				<section className="py-[2.4rem] mx-[2rem] space-y-[1.6rem]">
					<div className="flex items-center justify-between ">
						<div className="flex items-center space-x-[0.8rem]">
							<h1 className="text-subhead4 ">시재 기록</h1>
							<Badge color="coolGray" size="small">
								60일 보관
							</Badge>
						</div>

						<Link href={SERVICE_URL.inventoryHistory}>
							<span className="text-primary text-subhead1 ">전체보기</span>
						</Link>
					</div>
					<InfoBox className="flex flex-col space-y-[1.6rem] text-subhead1">
						<span>오늘의 시재 기록</span>
						{inventoryHistory?.length ? (
							<ul className="space-y-[0.8rem] ">
								{inventoryHistory?.map((item) => (
									<li className="flex items-center justify-between ">
										<div className="flex items-center space-x-[0.8rem]">
											<ProfileImage userProfileCode={item.userProfileCode} />
											<span className=" text-subhead2">{item.userName}</span>
											<span className="text-g6 text-subhead1">{item.workTime}</span>
										</div>
										<span className=" text-subhead1">{item.inventorySummumation}</span>
									</li>
								))}
							</ul>
						) : (
							<span className="text-g7 text-center">오늘의 시재 점검을 하지 않았습니다.</span>
						)}
					</InfoBox>
				</section>
			</main>
		</>
	);
}

export default InventoryScreen;
