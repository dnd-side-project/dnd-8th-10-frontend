import Link from 'next/link';
import React from 'react';
import Header from 'src/app.components/Header';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

function InventoryScreen() {
	const LINKS = [
		{ name: '담배', imageName: 'cigarette', url: SERVICE_URL.inventoryCigarette },
		{ name: '쓰레기 봉투', imageName: 'garbageBag', url: SERVICE_URL.inventoryBag },
		{ name: '문화 상품권', imageName: 'giftCard', url: SERVICE_URL.inventoryCard },
	];
	return (
		<>
			<Header title="시재점검" />

			<main>
				<section className="py-[1.6rem]">
					<div className="p-[1.6rem] space-y-[1.6rem] bg-g1 rounded-[0.8rem]">
						<div className="flex items-center justify-between text-subhead1">
							<h1>시재 기록</h1>
							<Link href="/">
								<span className="text-primary ">전체보기</span>
							</Link>
						</div>
						<div className="h-[7.2rem]" />
					</div>
				</section>
				<div className="bg-g1 w-[calc(100%+4rem)] -translate-x-[2rem] h-[1.2rem]" />
				<section className="text-g9 pt-[2.4rem] space-y-[1.2rem]">
					<h1 className="text-subhead1">점검하고자하는 시재를 선택하세요.</h1>
					<ul className="text-subhead2 space-y-[0.8rem]">
						{LINKS.map((item) => (
							<li>
								<Link href={item.url}>
									<div
										className={`before:content-[url('/images/checklist/${item.imageName}.svg')] before:mr-[0.8rem] flex items-center`}
									>
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
