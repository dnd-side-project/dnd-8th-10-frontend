import Link from 'next/link';
import React from 'react';
import Header from 'src/app.components/Header';
import ProfileImage from 'src/app.components/ProfileImage';
import { IInventoryHistory } from 'src/app.modules/api/inventory';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

interface Props {
	inventoryHistory: IInventoryHistory[];
}
function InventoryScreen({ inventoryHistory }: Props) {
	const LINKS = [
		{
			name: '담배',
			imageRender: "before:content-[url('/images/checklist/cigarette.svg')]",
			url: SERVICE_URL.inventoryCigarette,
		},
		{
			name: '쓰레기 봉투',
			imageRender: "before:content-[url('/images/checklist/garbageBag.svg')]",
			url: SERVICE_URL.inventoryBag,
		},
		{
			name: '문화 상품권',
			imageRender: "before:content-[url('/images/checklist/giftCard.svg')]",
			url: SERVICE_URL.inventoryCard,
		},
	];

	return (
		<>
			<Header title="시재점검" />

			<main className="pt-[5.6rem] h-[100vh]">
				<section className="py-[1.6rem]">
					<div className="p-[1.6rem] space-y-[1.6rem] bg-g1 rounded-[0.8rem]">
						<div className="flex items-center justify-between text-subhead1">
							<h1>시재 기록</h1>
							<Link href={SERVICE_URL.inventoryHistory}>
								<span className="text-primary ">전체보기</span>
							</Link>
						</div>
						{inventoryHistory.length ? (
							<ul className="space-y-[0.8rem] ">
								{inventoryHistory?.slice(0, 2).map((item) => (
									<li className="flex items-center justify-between ">
										<div className="flex items-center space-x-[0.8rem]">
											<ProfileImage userProfileCode={item.userProfileCode} />
											<span className="text-g9 text-subhead2">{item.userName}</span>
											<span className="text-g6 text-subhead1">{item.workTime}</span>
										</div>
										<span className="text-g9 text-subhead1">{item.list[0].inventoryName}</span>
									</li>
								))}
							</ul>
						) : null}
					</div>
				</section>
				<div className="bg-g1 w-[calc(100%+4rem)] -translate-x-[2rem] h-[1.2rem]" />
				<section className="text-g9 pt-[2.4rem] space-y-[1.2rem]">
					<h1 className="text-subhead1">점검하고자하는 시재를 선택하세요.</h1>
					<ul className="text-subhead2 space-y-[0.8rem]">
						{LINKS.map((item, index) => (
							<li key={index}>
								<Link href={item.url}>
									<div className={`${item.imageRender} before:mr-[0.8rem] flex items-center`}>
										<span>{item.name}</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</main>
		</>
	);
}

export default InventoryScreen;
