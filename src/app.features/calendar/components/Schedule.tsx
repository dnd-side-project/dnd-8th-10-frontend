import React from 'react';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import { IUserInfo } from '../types/indes';

function Schedule(idx: string, schedule: { [x: string]: {} | string }, toDay: string, now: number) {
	let userInfo: IUserInfo = {
		name: [],
	};
	for (let key in schedule) {
		const data = Object.keys(schedule[key]);
		for (let i = 0; i < data.length; i++) {
			const filter = data[i] === getDayOfWeek(idx);
			if (filter) {
				userInfo.name.push(key);
			}
		}
	}
	if (userInfo.name.length > 0) {
		return (
			<>
				{userInfo.name.map((_item, index: number) => (
					<div key={index}>
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
			<span className="flex justify-center items-center w-[30px] h-[30px]rounded">{now}</span>
		</div>
	);
}

export default Schedule;
