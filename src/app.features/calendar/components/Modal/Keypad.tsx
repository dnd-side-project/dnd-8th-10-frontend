import { type } from 'os';
import React, { useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import useModalStore from 'src/app.modules/store/modal';
import useStore from '../../store';
import useKeypadStore from '../../store/keypad';

type keypad = 'year' | 'month' | null;
interface Props {
	year: number;
	month: number;
}
function Keypad({ year, month }: Props) {
	const [keypadYear, setKeypadYear] = useState<string>(String(year));
	const [keypadMonth, setKeypadMonth] = useState<string>(''); // String(month + 1)
	const { setCalendar } = useStore();
	const { keypadChange } = useKeypadStore();
	const { modalIsClose } = useModalStore();

	const keypadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > e.target.maxLength) {
			e.target.value = e.target.value.slice(0, e.target.maxLength);
		}
		if (e.target.name === 'year') {
			setKeypadYear(e.target.value);
		}
		if (e.target.name === 'month') {
			setKeypadMonth(e.target.value);
		}
	};

	return (
		<div>
			<div className="flex items-center">
				<input
					value={keypadYear}
					onChange={keypadHandler}
					type="number"
					name="year"
					maxLength={4}
					className={`h-[3.6rem] flex items-center justify-end w-[50%] py-[0.8rem] px-[1.2rem] text-body2 text-g7 bg-w rounded-[0.8rem] focus:outline-none focus:border-solid focus:border-[0.15rem] focus:border-primary focus:text-g9 focus:text-subhead2`}
				/>
				<span className="text-subhead3 mx-[1rem]">년</span>
				<input
					typeof="number"
					value={keypadMonth}
					onChange={keypadHandler}
					type="number"
					name="month"
					maxLength={2}
					className={`h-[3.6rem] flex items-center justify-end w-[50%] py-[0.8rem] px-[1.2rem] text-body2 text-g7 bg-w rounded-[0.8rem] focus:outline-none focus:border-solid focus:border-[0.15rem] focus:border-primary focus:text-g9 focus:text-subhead2`}
				/>
				<span className="text-subhead3 ml-[1rem]">월</span>
			</div>
			<div className="pt-[6rem]">
				<Bar
					type="wide"
					disabled={keypadYear === '' || keypadMonth === ''}
					ClickFn={() => {
						setCalendar(Number(keypadYear), Number(keypadMonth) - 1);
						keypadChange();
						modalIsClose();
					}}
				>
					이동
				</Bar>
			</div>
		</div>
	);
}

export default Keypad;
