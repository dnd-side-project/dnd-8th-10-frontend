/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { IInventoryList } from 'src/app.modules/api/inventory';
import PlusIcon from 'src/app.modules/assets/checklist/addCircle.svg';
import MinusIcon from 'src/app.modules/assets/checklist/minusCircle.svg';
import { CountHistoryType } from '../types';

interface TempProps {
	inventory: IInventoryList;
	countHistory: CountHistoryType;
	changeDiffHandler: (action: 'increase' | 'decrease', inventoryName: string, inventoryCount: number) => void;
	onInventoryDelete: (inventoryIdx: number) => void;
	setMouseDraggble: () => void;
	isDragging: boolean;
}
function InventoryItem({
	inventory: { inventoryName, inventoryIdx, inventoryCount },
	changeDiffHandler,
	onInventoryDelete,
	countHistory,
	isDragging,
	setMouseDraggble,
}: TempProps) {
	const diff = countHistory[inventoryName] ?? inventoryCount;
	// eslint-disable-next-line no-nested-ternary
	const diffTextColor = diff !== 0 ? (diff < 0 ? 'text-secondary' : 'text-primary') : '';
	const [left, setLeft] = useState<number>(0);

	const [mousePosition, setMousePosition] = useState(null);

	const handleMouseDown = (event: any) => {
		if (event.target.name === 'button') return;
		setMouseDraggble();
		setMousePosition(event.clientX);
	};

	const handleMouseMove = (event: any) => {
		if (event.target.name === 'button') return;
		if (!isDragging) {
			return;
		}
		if (mousePosition === null) return;

		const dx = event.clientX - mousePosition;

		let newLeft = left + dx;
		if (newLeft < -82) newLeft = -82;
		if (newLeft > 0) newLeft = 0;
		setLeft(newLeft);
		setMousePosition(event.clientX);
	};
	const inventoryDeleteHandler = () => {
		onInventoryDelete(inventoryIdx);
	};
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<li
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			style={{ left: `${left}px`, cursor: 'move' }}
			className="flex w-[calc(100%+8.2rem)] items-center min-h-[4.4rem] h-[4.4rem] relative justify-between "
		>
			<span>{inventoryName}</span>
			<div className="flex  items-center space-x-[1.6rem]">
				<div className="flex  relative min-w-[8.6rem] w-[8.6rem] justify-between">
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
				<button
					name="delete"
					onClick={(e) => {
						e.stopPropagation();
						inventoryDeleteHandler();
					}}
					className="h-[4.4rem] min-h-[4.4rem] bg-secondary min-w-[6.6rem] text-w text-subhead2"
				>
					삭제
				</button>
			</div>
		</li>
	);
}
interface Props {
	inventoryList: IInventoryList[];
	countHistory: CountHistoryType;
	changeDiffHandler: (action: 'increase' | 'decrease', inventoryName: string, inventoryCount: number) => void;
	onInventoryDelete: (inventoryIdx: number) => void;
}

function InventoryList({ inventoryList, countHistory, changeDiffHandler, onInventoryDelete }: Props) {
	const [isDragging, setIsDragging] = useState(false);
	const handleMouseUp = () => {
		setIsDragging(false);
	};
	useEffect(() => {
		document.addEventListener('mouseup', handleMouseUp);
		return () => document.removeEventListener('mouseup', handleMouseUp);
	}, []);
	return (
		<ul className="text-subhead-long2 w-full overflow-x-hidden h-fit">
			{inventoryList.map((inventory, index) => (
				<InventoryItem
					key={inventory.inventoryIdx}
					inventory={inventory}
					countHistory={countHistory}
					changeDiffHandler={changeDiffHandler}
					setMouseDraggble={() => setIsDragging(true)}
					isDragging={isDragging}
					onInventoryDelete={onInventoryDelete}
				/>
			))}
			<div aria-hidden className="w-full h-[6rem]" />
		</ul>
	);
}

export default InventoryList;
