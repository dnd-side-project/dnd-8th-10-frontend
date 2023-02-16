import React, { useState } from 'react';
import KeypadDelIcon from 'src/app.modules/assets/calendar/keypadDel.svg';
import useModalStore from 'src/app.modules/store/modal';
import useStore from '../store';
import useKeypadStore from '../store/keypad';

type keypad = 'year' | 'month' | null;
interface Props {
	year: number;
	month: number;
}
function Keypad({ year, month }: Props) {
	const [openKeypad, setOpenKeypad] = useState<keypad>(null);
	const [keypadYear, setKeypadYear] = useState<string>('');
	const [keypadMonth, setKeypadMonth] = useState<string>('');
	const { setCalendar } = useStore();
	const { keypadChange } = useKeypadStore();
	const { modalIsClose } = useModalStore();
	const calendarHandler = (e: React.BaseSyntheticEvent) => {
		const { value } = e.target;
		if (openKeypad === 'year' && keypadYear.length < 4) {
			setKeypadYear((state) => state + value);
		}
		if (openKeypad === 'month' && keypadMonth.length < 2) {
			setKeypadMonth((state) => state + value);
		}
	};
	return (
		<div>
			<div className="flex items-center">
				<button
					type="button"
					onClick={() => setOpenKeypad('year')}
					className={`flex items-center justify-end w-[50%] py-[0.8rem] px-[1.2rem] bg-w rounded-[0.8rem] ${
						openKeypad === 'year'
							? 'border-solid border-[0.15rem] border-primary text-g9 text-subhead2'
							: 'text-body2 text-g7 '
					}`}
				>
					{keypadYear || year}
					{openKeypad === 'year' && (
						<span
							role="presentation"
							onClick={() => setKeypadYear(keypadYear.slice(0, -1))}
							className="py-[0.2rem] ml-[0.8rem]"
						>
							<KeypadDelIcon />
						</span>
					)}
				</button>
				<span className="text-subhead3 mx-[1rem]">년</span>
				<button
					type="button"
					onClick={() => setOpenKeypad('month')}
					className={`flex items-center justify-end w-[50%] py-[0.8rem] px-[1.2rem] bg-w rounded-[0.8rem] text-right ${
						openKeypad === 'month'
							? 'border-solid border-[0.15rem] border-primary text-g9 text-subhead2'
							: 'text-body2 text-g7 '
					}`}
				>
					{keypadMonth || month + 1}
					{openKeypad === 'month' && (
						<span
							role="presentation"
							onClick={() => setKeypadMonth(keypadMonth.slice(0, -1))}
							className="py-[0.2rem] ml-[0.8rem]"
						>
							<KeypadDelIcon />
						</span>
					)}
				</button>
				<span className="text-subhead3 ml-[1rem]">월</span>
			</div>
			<div className="my-[2.4rem]">
				{[0, 5].map((offset) => (
					<ul className="flex" key={offset}>
						{[offset, 1 + offset, 2 + offset, 3 + offset, 4 + offset].map((number) => (
							<div
								key={number}
								className="active:bg-g4 flex justify-center w-[57.8rem] h-[5.8rem]  bg-w rounded-[0.8rem] mb-[0.7rem] mr-[0.8rem] last:mr-0"
							>
								<button
									onClick={calendarHandler}
									className="w-full text-[1.6rem] text-g7 active:text-g10 "
									type="button"
									value={number}
									name="number"
								>
									{number}
								</button>
							</div>
						))}
					</ul>
				))}
			</div>
			<div className="mt-[-0.7rem]">
				<button
					type="button"
					onClick={() => {
						setCalendar(Number(keypadYear), Number(keypadMonth) - 1);
						keypadChange();
						modalIsClose();
					}}
					className={`${(keypadYear || keypadMonth) && 'bg-primary'} bg-g2 w-full h-[6rem] rounded-[0.8rem]`}
				>
					<span className={`text-g7 text-subhead4 ${(keypadYear || keypadMonth) && 'text-w'} `}>이동</span>
				</button>
			</div>
		</div>
	);
}

export default Keypad;
