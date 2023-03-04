import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';
import { boardCheckCategory } from 'src/app.features/board/api';
import AlarmScreen from 'src/app.features/home/screens/AlarmScreen';
import { getAlarmList } from 'src/app.modules/api/alram';

const Alarm: NextPage = () => {
	// 알림있는지 확인
	const { data: hasAlarm } = useQuery(['notice', 'list'], getAlarmList, {
		select: (res) => res.data,
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	return (
		<>
			<AlarmScreen AlarmData={AlarmData} />
		</>
	);
};

export default Alarm;
