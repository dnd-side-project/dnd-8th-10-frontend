import type { NextPage } from 'next';
import React from 'react';
import HomeScreen from 'src/app.features/home/screens/HomeScreen';
import Navigation from 'src/app.components/Navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import useStore from 'src/app.features/calendar/store';
import { getGray, getToDay, postWork } from 'src/app.features/calendar/api';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import Header from 'src/app.features/home/components/Header';

const Home: NextPage = () => {
	const { toDay } = useStore();
	const [year, month, _] = toDay.split('.');

	// 출근했던 기록
	const { data: grayData, refetch: grayRefetch } = useQuery(
		['gray'],
		() =>
			getGray({
				year,
				month,
			}),
		{
			select: (res) => res.data.data.map(Number),
			onSuccess: (res) => {
				// console.log(res);
			},
			onError: (error) => {
				console.log(error);
			},
			retry: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);
	// 출근하기
	const { mutate: WorkMutate } = useMutation(postWork, {
		onSuccess: (res) => {
			// console.log(res);
			grayRefetch();
		},
		onError: (error) => alert('오류 발생.'),
	});

	// 오늘이 일하는 요일이면 시간 가져오기
	const { data: todayWork } = useQuery(['todayWork'], () => getToDay(getDayOfWeek(toDay)), {
		select: (res) => res.data,
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	return (
		<div>
			<Header />
			<div className="h-[100vh] bg-[#FCFCFF] w-[calc(100%+4rem)] px-[2rem] -translate-x-[2rem]">
				<HomeScreen grayData={grayData} WorkMutate={WorkMutate} todayWork={todayWork} />
			</div>
			<Navigation />
		</div>
	);
};

export default Home;
