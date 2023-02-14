import React, { useState } from 'react';
import Header from 'src/app.components/Header';
import ProfileImage from 'src/app.components/ProfileImage';
import { IInventoryHistory } from 'src/app.modules/api/inventory';
import FilterButtons from '../components/FilterButtons';

interface Props {
	inventoryHistory: IInventoryHistory[];
}
type InventoryType = 'ALL' | 'CIGARETTE' | 'GARBAGEBAG' | 'GIFTCARD';
function InventoryHistoryScreen({ inventoryHistory }: Props) {
	const [filter, setFilter] = useState<InventoryType>('ALL');
	const filterHandler = (e: React.BaseSyntheticEvent) => {
		setFilter(e.target.value);
	};

	const mappedFilter: { [k in InventoryType]: string } = {
		ALL: '전체',
		CIGARETTE: '담배',
		GARBAGEBAG: '쓰레기 봉투',
		GIFTCARD: '문화 상품권',
	};
	const getInventoryImage = (category: string) => {
		if (category === 'cigarette') return "before:content-[url('/images/checklist/history/CIGARETTE.svg')] ";
		if (category === 'garbagebag') return "before:content-[url('/images/checklist/history/GARBAGEBAG.svg')] ";
		return "before:content-[url('/images/checklist/history/GIFTCARD.svg')] ";
	};
	return (
		<>
			<Header title="시재기록" />

			<main className=" space-y-[1.6rem]  text-subhead1 h-[calc(100vh-5.6rem)] text-g9 relative overflow-hidden">
				<FilterButtons filterHandler={filterHandler} selectedFilter={filter} filters={Object.values(mappedFilter)} />
				<div className=" py-[1.6rem] h-[calc(100%-6rem)] overflow-y-scroll scrollbar-hidden">
					<ul className="space-y-[0.8rem] ">
						{inventoryHistory &&
							inventoryHistory.map((item, index) => (
								<li key={index} className="p-[1.6rem] space-y-[0.8rem]  bg-g1 rounded-[0.8rem] ">
									<div className="space-x-[0.8rem] flex items-center">
										<ProfileImage size="md" userProfileCode={item.userProfileCode} />
										<span className="text-subhead2">{item.userName}</span>
										<span className="text-g6 ">
											{item.workDay}/{item.workTime}
										</span>
									</div>
									<ul className="pl-[2.4rem]  space-y-[0.8rem]">
										{item.list.map((record, idx) => (
											<li
												key={`record-${idx}`}
												className={`flex
											items-center justify-between  `}
											>
												<div
													className={`${getInventoryImage(
														record.category as string
													)} flex items-center before:mr-[0.8rem]`}
												>
													<span>{record.inventoryName}</span>
												</div>
												<span>
													<span
														className={`${(record?.diff ?? 0) > 0 ? 'text-primary' : ''} ${
															(record?.diff ?? 0) < 0 ? 'text-secondary' : ''
														}`}
													>
														{(record?.diff ?? 0) > 0 ? '+' : ''}
														{record.diff}
													</span>
												</span>
											</li>
										))}
									</ul>
								</li>
							))}
					</ul>
				</div>
			</main>
		</>
	);
}

export default InventoryHistoryScreen;
