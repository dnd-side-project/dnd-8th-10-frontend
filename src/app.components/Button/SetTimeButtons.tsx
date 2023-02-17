import Chip from '../app.base/Button/Chip';

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
		meridiem: 'am' | 'pm';
		hour: string;
		minute: string;
	};
}
// TODO: 중복 코드 줄이기
function SetTimeButtons({ timeHandler, time }: Props) {
	return (
		<div className="w-full space-y-[2.4rem]  bg-slate-200 whitespace-nowrap">
			<div className="w-full flex justify-between items-start">
				<span className="text-g10 text-subhead3">오전/오후</span>
				<div className="flex gap-[0.8rem] ">
					<Chip
						onClick={timeHandler}
						isPressed={time?.meridiem === 'am'}
						value="am"
						name="meridiem"
						item="오전"
						mode="h40"
						className="w-[11.25rem]"
					/>
					<Chip
						onClick={timeHandler}
						isPressed={time?.meridiem === 'pm'}
						value="pm"
						name="meridiem"
						item="오후"
						mode="h40"
						className="w-[11.25rem]"
					/>
				</div>
			</div>
			<div className="flex justify-between items-start">
				<span className="text-g10 text-subhead3">시</span>
				<ul className="grid grid-cols-6 gap-[0.8rem]">
					{Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
						<li key={hour}>
							<Chip
								name="hour"
								mode="h32"
								item={`${hour}`}
								value={`${hour}`}
								isPressed={time?.hour === `${hour}`}
								onClick={timeHandler}
							/>
						</li>
					))}
				</ul>
			</div>
			<div className="flex justify-between items-start">
				<span className="text-g10 text-subhead3">분</span>
				<ul className="grid grid-cols-6 gap-[0.8rem]">
					{Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
						<li key={minute}>
							<Chip
								name="minute"
								mode="h32"
								item={`${minute}`}
								value={`${minute}`}
								isPressed={time?.minute === `${minute}`}
								onClick={timeHandler}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default SetTimeButtons;
