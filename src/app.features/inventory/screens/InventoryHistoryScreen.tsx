import React from 'react';
import Header from 'src/app.components/Header';
import InfoBox from 'src/app.components/InfoBox';
import ProfileImage from 'src/app.components/ProfileImage';
import FilterButtons from '../components/FilterButtons';
import { IInventory, InventoryHistoryType, InvetoryFilterType, mappedInventoryFilter } from '../types';

interface Props {
	inventoryHistory: InventoryHistoryType[];
	filter: InvetoryFilterType;
	onFilterChange: (e: React.BaseSyntheticEvent) => void;
}

function InventoryHistoryScreen({ inventoryHistory, onFilterChange, filter }: Props) {
	const getInventoryImage = (category: IInventory['category']) => {
		if (category === 'CIGARETTE') return "before:content-[url('/images/checklist/history/CIGARETTE.svg')] ";
		if (category === 'GARBAGEBAG') return "before:content-[url('/images/checklist/history/GARBAGEBAG.svg')] ";
		return "before:content-[url('/images/checklist/history/GIFTCARD.svg')] ";
	};

	return (
		<>
			<Header title="전체 시재 기록" />

			<main className="pb-[1.6rem] text-subhead1  text-g9 relative ">
				<div className="sticky w-full pb-[1.6rem] top-0 z-[50] pt-[7.2rem] bg-w">
					<FilterButtons
						filterHandler={onFilterChange}
						selectedFilter={filter}
						filters={Object.keys(mappedInventoryFilter)}
					/>
				</div>

				<ul className="space-y-[0.8rem] ">
					{inventoryHistory &&
						inventoryHistory.map((item, index) => (
							<li key={index}>
								<InfoBox className="space-y-[0.8rem]">
									<div className="space-x-[0.8rem] flex items-center">
										<ProfileImage size="md" userProfileCode={item.userProfileCode} />
										<span className="text-subhead2">{item.userName}</span>
										<span className="text-g7 text-subhead1 ">
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
												<div className={`${getInventoryImage(record.category)} flex items-center before:mr-[0.8rem]`}>
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
								</InfoBox>
							</li>
						))}
				</ul>
			</main>
		</>
	);
}

export default InventoryHistoryScreen;
