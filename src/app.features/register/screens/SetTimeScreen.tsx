import React, { useState } from 'react';
import useRegisterUserStore from '../store';

type Flag = 'startTime' | 'endTime' | null;
interface tempProps {
	timeHandler: (e: React.BaseSyntheticEvent) => void;
	time: {
		meridiem: 'am' | 'pm';
		hour: string;
		minute: string;
	};
	flag: Flag;
	closeModal: () => void;
}
function SetTimeButtons({ timeHandler, time, closeModal, flag }: tempProps) {
	return (
		<div className="w-[500px] h-[5000x] bg-slate-200">
			<div>
				<button
					type="button"
					onClick={timeHandler}
					aria-pressed={time.meridiem === 'am'}
					value="am"
					name="meridiem"
					className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
				>
					오전
				</button>

				<button
					type="button"
					onClick={timeHandler}
					aria-pressed={time.meridiem === 'pm'}
					value="pm"
					name="meridiem"
					className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
				>
					오후
				</button>
			</div>
			<div>
				<span>시</span>
				<div className="space-y-1">
					<ul className="flex space-x-1">
						{[1, 2, 3, 4, 5, 6].map((hour) => (
							<li key={hour}>
								<button
									type="button"
									value={hour}
									name="hour"
									onClick={timeHandler}
									aria-pressed={time.hour === `${hour}`}
									className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
								>
									{hour}
								</button>
							</li>
						))}
					</ul>
					<ul className="flex space-x-1">
						{[7, 8, 9, 10, 11, 12].map((hour) => (
							<li key={hour}>
								<button
									type="button"
									value={hour}
									name="hour"
									onClick={timeHandler}
									aria-pressed={time.hour === `${hour}`}
									className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
								>
									{hour}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div>
				<span>분</span>
				<div className="space-y-1">
					<ul className="flex space-x-1">
						{[0, 5, 10, 15, 20, 25].map((minute) => (
							<li key={minute}>
								<button
									type="button"
									value={minute}
									name="minute"
									onClick={timeHandler}
									aria-pressed={time.minute === `${minute}`}
									className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
								>
									{minute}
								</button>
							</li>
						))}
					</ul>
					<ul className="flex space-x-1">
						{[30, 35, 40, 45, 50, 55].map((minute) => (
							<li key={minute}>
								<button
									type="button"
									value={minute}
									name="minute"
									onClick={timeHandler}
									aria-pressed={time.minute === `${minute}`}
									className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
								>
									{minute}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<button onClick={closeModal}>완료</button>
		</div>
	);
}

// TODO: 시간 유효성체크 (끝나는 시간이 시작하는 시간보다 빠른지)

function SetTimeScreen() {
	const {
		user: { startTime, endTime },
		setTime,
	} = useRegisterUserStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};
	console.log(startTime, endTime);
	return (
		<div>
			<div className="flex flex-col space-y-2">
				<button onClick={() => setOpenModalFlag('startTime')}>
					시작시간 : {startTime.hour}시 {startTime.minute}분 {startTime.meridiem}
				</button>
				<button onClick={() => setOpenModalFlag('endTime')}>
					종료시간 : {endTime.hour}시 {endTime.minute}분 {endTime.meridiem}
				</button>
			</div>
			{openModalFlag !== null && (
				<SetTimeButtons
					closeModal={() => setOpenModalFlag(null)}
					timeHandler={timeHandler}
					flag={openModalFlag}
					time={openModalFlag === 'startTime' ? startTime : endTime}
				/>
			)}
		</div>
	);
}

export default SetTimeScreen;
