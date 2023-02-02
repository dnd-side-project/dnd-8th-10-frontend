import React from 'react';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import { IUserInfo } from '../types/indes';

function Schedule(idx: string, todo: { [x: string]: {} | string }) {
	let userInfo: IUserInfo = {
		name: [],
		time: [],
	};

	for (let key in todo) {
		const data = Object.keys(todo[key]);
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
					console.log(idx);
				}}
				className="cursor-pointer"
			>
				{userInfo.name.map((item: string | undefined, index: React.Key | null | undefined) => (
					<div key={index}>{item}</div>
				))}
			</div>
		);
	}
	return null;
}

export default Schedule;
