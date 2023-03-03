import { useQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import React from 'react';
import { boardCheckCategory } from 'src/app.features/board/api';
import AlarmScreen from 'src/app.features/home/screens/AlarmScreen';

const Alarm: NextPage = () => {
	const { data: AlarmData, isLoading: AlarmLoading } = useQuery(['noticeData'], () => boardCheckCategory('all'), {
		select: (res) => res.data.data.sort((a: { postId: number }, b: { postId: number }) => b.postId - a.postId),
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	return <>{!AlarmLoading && <AlarmScreen AlarmData={AlarmData} />}</>;
};

export default Alarm;
