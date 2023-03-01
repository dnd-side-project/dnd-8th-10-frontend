import React, { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import InfoBox from 'src/app.components/InfoBox';
import ProfileImage from 'src/app.components/ProfileImage';
import { IInventoryHistory } from 'src/app.modules/api/inventory';
import FilterButtons from '../components/FilterButtons';
import { InventoryType, mappedFilter } from '../types';

interface Props {
	inventoryHistory: IInventoryHistory[];
	filter: InventoryType;
	filterHandler: (e: React.BaseSyntheticEvent) => void;
}

function InventoryHistoryScreen({ inventoryHistory, filterHandler, filter }: Props) {
	const getInventoryImage = (category: string) => {
		if (category === 'cigarette') return "before:content-[url('/images/checklist/history/CIGARETTE.svg')] ";
		if (category === 'garbagebag') return "before:content-[url('/images/checklist/history/GARBAGEBAG.svg')] ";
		return "before:content-[url('/images/checklist/history/GIFTCARD.svg')] ";
	};

	return (
		<>
			<Header title="전체 시재 기록" />

			<main className="pt-[7.2rem] space-y-[1.6rem]  text-subhead1 h-[100vh] text-g9 relative overflow-hidden">
				<FilterButtons filterHandler={filterHandler} selectedFilter={filter} filters={Object.keys(mappedFilter)} />
				<div className=" pb-[1.6rem] h-[calc(100%-6rem)] overflow-y-scroll scrollbar-hidden">
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
									</InfoBox>
								</li>
							))}
					</ul>
				</div>
			</main>
		</>
	);
}

export default InventoryHistoryScreen;
