import React from 'react';
import { getScheduleMatch } from 'src/app.modules/util/calendar';
import { IUserInfo } from '../types';

function Schedule(idx: string, schedule: { [x: string]: object | string }, toDay: string, now: number) {
	const userInfo: IUserInfo = {
		name: [],
	};
	if (schedule !== undefined) {
		userInfo.name = getScheduleMatch(schedule, idx);
	}

	if (userInfo.name.length > 0) {
		return (
			<>
				{userInfo.name.map((_item, index: number) => (
					<div key={index}>
						{/* 근무일이 당일 일시 */}
						{idx === toDay ? (
							<span className="text-white flex justify-center items-center w-[30px] h-[30px] bg-black rounded">
								{now}
							</span>
						) : (
							<span className="flex justify-center items-center w-[30px] h-[30px] bg-gray-200 rounded">{now}</span>
						)}
					</div>
				))}
			</>
		);
	}
	return (
		<div key={now}>
			{idx === toDay ? (
				<span className="text-white flex justify-center items-center w-[30px] h-[30px] bg-black rounded">{now}</span>
			) : (
				<span className="flex justify-center items-center w-[30px] h-[30px]rounded">{now}</span>
			)}
		</div>
	);
}

export default Schedule;
