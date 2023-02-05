import React from 'react';
import { getScheduleMatch } from 'src/app.modules/util/calendar';
import { ISchedule, IUserInfo } from '../types';

function Schedule(idx: string, schedule: ISchedule, toDay: string, now: number) {
	const userInfo: IUserInfo = {
		name: [],
	};

	// 최적화 필요
	userInfo.name = getScheduleMatch(schedule, idx);

	if (userInfo.name.length > 0) {
		return (
			<>
				{userInfo.name.map((_item, index: number) => (
					<div key={index}>
						{/* 근무일이 당일 일시 */}
						{idx === toDay ? (
							<span className="text-white flex justify-center items-center w-[30px] h-[30px] bg-black rounded-lg">
								{now}
							</span>
						) : (
							<span className="flex justify-center items-center w-[30px] h-[30px] bg-gray-200 rounded-lg">{now}</span>
						)}
					</div>
				))}
			</>
		);
	}
	return (
		<div key={now}>
			{idx === toDay ? (
				<span className="text-white flex justify-center items-center w-[30px] h-[30px] bg-[#026FEB] rounded-lg">
					{now}
				</span>
			) : (
				<span className="flex justify-center items-center w-[30px] h-[30px] rounded-lg">{now}</span>
			)}
		</div>
	);
}

export default Schedule;
