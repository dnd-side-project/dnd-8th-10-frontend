import React, { useState } from 'react';
import Bar from 'src/app.components/app.base/Button/Bar';
import SetTimeButtons from 'src/app.components/Button/SetTimeButtons';
import useTimeSetStore from '../../store/time';

interface Props {
	workTime: string;
	commute: () => void;
}
type Flag = 'startTime' | 'endTime' | null;
function Working({ workTime, commute }: Props) {
	const {
		user: { startTime, endTime },
		setTime,
	} = useTimeSetStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const getWorkTimeString = () => {
		try {
			return `${startTime.hour.length === 1 && startTime.meridiem === 'am' ? '0' : ''}${
				+startTime.hour + (startTime.meridiem === 'am' ? 0 : 12)
			}:${startTime.minute.length === 1 ? '0' : ''}${startTime.minute}~${
				endTime.hour.length === 1 && endTime.meridiem === 'am' ? '0' : ''
			}${+endTime.hour + (endTime.meridiem === 'am' ? 0 : 12)}:${endTime.minute.length === 1 ? '0' : ''}${
				endTime.minute
			}`;
		} catch (e) {
			console.log(e);
			return '';
		}
	};
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const { name, value } = e.target;
		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};

	return (
		<div>
			<div className="flex text-g9 mb-[0.8rem]">
				<div className="w-[50%]">
					<span className="text-subhead3">시작</span>
				</div>
				<div className="w-[50%]">
					<span className="text-subhead3 ml-[1.4rem]">종료</span>
				</div>
			</div>
			<div className="flex items-center mb-[2.4rem]">
				<button
					onClick={() => setOpenModalFlag('startTime')}
					className={`${
						openModalFlag === 'startTime'
							? 'text-g9 text-subhead2 border-solid border-[0.15rem] border-primary'
							: 'text-g7 text-body2'
					} w-[50%] h-[4.8rem] bg-w rounded-[0.8rem] ${workTime !== '' && 'text-g9 text-subhead2'}`}
				>
					{workTime !== '' ? workTime.split('~')[0] : `${startTime.hour}시 ${startTime.minute}분 ${startTime.meridiem}`}
				</button>
				<span className="text-subhead3 mx-[1rem]">~</span>
				<button
					onClick={() => setOpenModalFlag('endTime')}
					className={`${
						openModalFlag === 'endTime'
							? 'text-g9 text-subhead2 border-solid border-[0.15rem] border-primary'
							: 'text-g7 text-body2'
					} w-[50%] h-[4.8rem] bg-w rounded-[0.8rem] ${workTime !== '' && 'text-g9 text-subhead2'}`}
				>
					{workTime !== '' ? workTime.split('~')[1] : `${endTime.hour}시 ${endTime.minute}분 ${endTime.meridiem}`}
				</button>
			</div>
			{openModalFlag !== null && (
				<div>
					<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
				</div>
			)}
			<div className="mt-[2.4rem]">
				<Bar ClickFn={() => commute()} disabled={workTime === '' && getWorkTimeString() === '00:00~00:00'}>
					출근하기
				</Bar>
			</div>
		</div>
	);
}

export default Working;
