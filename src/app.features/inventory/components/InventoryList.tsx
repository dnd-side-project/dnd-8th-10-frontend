import React from 'react';
import { IInventoryList } from 'src/app.modules/api/inventory';
import PlusIcon from 'src/app.modules/assets/checklist/addCircle.svg';
import MinusIcon from 'src/app.modules/assets/checklist/minusCircle.svg';
import { CountHistoryType } from '../types';

interface Props {
	inventoryList: IInventoryList[];
	countHistory: CountHistoryType;
	changeDiffHandler: (action: 'increase' | 'decrease', inventoryName: string, inventoryCount: number) => void;
}
function InventoryList({ inventoryList, countHistory, changeDiffHandler }: Props) {
	/* TODO: 임시로 리스트 padding-bottom값 넣어둠 수정 필요 */

	return (
		<ul className="text-subhead-long2  space-y-[3.2rem] h-fit">
			{inventoryList.map(({ inventoryName, inventoryCount }, index) => {
				const diff = countHistory[inventoryName] ?? inventoryCount;
				// eslint-disable-next-line no-nested-ternary
				const diffTextColor = diff !== 0 ? (diff < 0 ? 'text-secondary' : 'text-primary') : '';
				return (
					<li key={index} className="flex w-full items-center justify-between ">
						<span>{inventoryName}</span>

						<div className="flex relative min-w-[8.6rem] w-[8.6rem] justify-between">
							<button
								name="increase"
								data-name={inventoryName}
								data-diff={inventoryCount}
								onClick={() => changeDiffHandler('increase', inventoryName, inventoryCount)}
							>
								<PlusIcon />
							</button>
							<span className={`${diffTextColor}`}>
								{diff > 0 && '+'}
								{diff}
							</span>
							<button
								name="decrease"
								data-name={inventoryName}
								data-diff={inventoryCount}
								onClick={() => changeDiffHandler('decrease', inventoryName, inventoryCount)}
							>
								<MinusIcon />
							</button>
						</div>
					</li>
				);
			})}
			<div aria-hidden className="w-full h-[6rem]" />
		</ul>
	);
}

export default InventoryList;
