import Link from 'next/link';
import React, { useState } from 'react';
import SetTimeButtons from 'src/app.components/SetTimeButtons';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useRegisterUserStore from '../store';

// TODO: 시간 유효성체크 (끝나는 시간이 시작하는 시간보다 빠른지)
type Flag = 'startTime' | 'endTime' | null;
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
				<div>
					<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
					<button onClick={() => setOpenModalFlag(null)}>완료</button>
				</div>
			)}
			<Link href={`${SERVICE_URL.register}?page=4`}>다음으로</Link>
		</div>
	);
}

export default SetTimeScreen;
