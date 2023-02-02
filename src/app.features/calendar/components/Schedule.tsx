import React from 'react';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import { IUserInfo } from '../types/indes';

function Schedule(idx: string, schedule: { [x: string]: {} | string }, toDay: string) {
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
			<div
				onClick={() => {
					console.log(idx, toDay);
				}}
				className="cursor-pointer"
			>
				{userInfo.name.map((_item: string, index: number) => (
					<div key={index}>
						{idx === toDay ? (
							<div className="w-[50px] h-[50px] rounded bg-black" key={index}></div>
						) : (
							<div className="w-[50px] h-[50px] rounded bg-[#D9D9D9]" key={index}></div>
						)}
					</div>
				))}
			</div>
		);
	}
	return null;
}

export default Schedule;
