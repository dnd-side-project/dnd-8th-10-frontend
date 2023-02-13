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
		<ul className="text-subhead-long2 fill-linear-gradient space-y-[3.2rem] h-full pb-[30rem] overflow-y-scroll  scrollbar-hidden">
			{inventoryList.map((inventory, index) => (
				<li key={index} className="flex w-full items-center justify-between ">
					<span>{inventory.inventoryName}</span>

					<div className="flex relative  space-x-[3.2rem]">
						<button
							name="increase"
							data-name={inventory.inventoryName}
							data-diff={inventory.inventoryCount}
							onClick={() => changeDiffHandler('increase', inventory.inventoryName, inventory.inventoryCount)}
						>
							<PlusIcon />
						</button>
						<span className="absolute right-[3.8rem]">
							{countHistory[inventory.inventoryName] ?? inventory.inventoryCount}
						</span>
						<button
							name="decrease"
							data-name={inventory.inventoryName}
							data-diff={inventory.inventoryCount}
							onClick={() => changeDiffHandler('decrease', inventory.inventoryName, inventory.inventoryCount)}
						>
							<MinusIcon />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}

export default InventoryList;
