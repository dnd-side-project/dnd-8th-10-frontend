interface Props {
	timeHandler: ((e: React.BaseSyntheticEvent) => void) | (() => void); // 시간 설정 handler 저의 경우, hadler를 아래 방식으로 정의했습니다.
	/*
      const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};

    ()=>void 형태로 선언해도 됨.
    */
	time: {
		meridiem: '오전' | '오후';
		hour: string;
		minute: string;
	}; // 현재 눌러져있는 버튼
}
function SetTimeButtons({ timeHandler, time }: Props) {
	return (
		<div className="w-[screen] h-[5000x] bg-slate-200">
			<div>
				<button
					type="button"
					onClick={timeHandler}
					aria-pressed={time.meridiem === '오전'}
					value="오전"
					name="meridiem"
					className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
				>
					오전
				</button>

				<button
					type="button"
					onClick={timeHandler}
					aria-pressed={time.meridiem === '오후'}
					value="오후"
					name="meridiem"
					className="aria-pressed:bg-blue-400 bg-gray-400 p-2"
				>
					오후
				</button>
			</div>
			<div>
				<span>시</span>
				<div className="space-y-1">
					{[0, 6].map((offset) => (
						<ul className="flex space-x-1" key={offset}>
							{[1 + offset, 2 + offset, 3 + offset, 4 + offset, 5 + offset, 6 + offset].map((hour) => (
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
					))}
				</div>
			</div>
			<div>
				<span>분</span>
				<div className="space-y-1">
					{[0, 30].map((offset) => (
						<ul className="flex space-x-1" key={offset}>
							{[0 + offset, 5 + offset, 10 + offset, 15 + offset, 20 + offset, 25 + offset].map((minute) => (
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
					))}
				</div>
			</div>
		</div>
	);
}

export default SetTimeButtons;
