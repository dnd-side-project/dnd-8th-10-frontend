import React from 'react';
import Overlay from 'src/app.components/Modal/Overlay';
import TopModal from 'src/app.components/Modal/TopModal';
import { CountHistoryType } from '../types';

interface Props {
	countHistory: CountHistoryType;
	category: 'cigarette' | 'garbagebag' | 'giftcard';
	closeModal: () => void;
}

function LastCheckModal({ countHistory, category, closeModal }: Props) {
	const getIconUrl = () => {
		if (category === 'cigarette') return "before:content-[url('/images/inventory/cigarette_small.svg')]";
		if (category === 'garbagebag') return "before:content-[url('/images/inventory/garbagebag_small.svg')]";
		return "before:content-[url('/images/inventory/giftcard_small.svg')]";
	};
	return (
		<Overlay overlayClickFn={closeModal}>
			<TopModal>
				<div className="space-y-[2.4rem] flex flex-col items-start ">
					<div className={`${getIconUrl()} before:mr-[0.8rem] flex items-center`}>
						<span className="text-g10 text-subhead3">점검사항 확인</span>
					</div>

					<ul className="flex flex-col gap-[8px] w-full text-subhead-long2 ">
						{Object.entries(countHistory).map(([inventoryName, inventoryDiff], index) => (
							<li key={index} className="flex justify-between items-center ">
								<span className="">{inventoryName}</span>
								<span
									className={`${
										// eslint-disable-next-line no-nested-ternary
										inventoryDiff !== 0 ? (inventoryDiff > 0 ? 'text-primary' : 'text-secondary') : ''
									}`}
								>
									{inventoryDiff !== 0 && <>{inventoryDiff >= 0 && '+ '}</>}
									{inventoryDiff}
								</span>
							</li>
						))}
					</ul>
				</div>
			</TopModal>
		</Overlay>
	);
}

export default LastCheckModal;
