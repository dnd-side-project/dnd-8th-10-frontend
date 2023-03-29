import type { NextPage } from 'next';
import React from 'react';
import HomeScreen from 'src/app.features/home/screens/HomeScreen';
import Navigation from 'src/app.components/Navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import useStore from 'src/app.features/calendar/store';
import { getGray, getToDay, postWork } from 'src/app.features/calendar/api';
import { getDayOfWeek } from 'src/app.modules/util/calendar';
import Header from 'src/app.features/home/components/Header';
import useUser from 'src/app.modules/hooks/user/useUser';
import EasterEgg from 'src/app.features/home/components/EasterEgg';
import { boardCheckCategory } from 'src/app.features/board/api';
import { getAlarmNotice } from 'src/app.modules/api/alram';

const Home: NextPage = () => {
	const { toDay } = useStore();
	const [year, month, _] = toDay.split('.');
	const { data, refetch, isLoading } = useUser();
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
			console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// 알림있는지 확인
	const { data: hasNotice } = useQuery(['notice'], getAlarmNotice, {
		select: (res) => res.data,
		onSuccess: (res) => {
			// console.log(res);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const { data: boardNoticeData, isLoading: boardNoticeLoading } = useQuery(
		['noticeData'],
		() => boardCheckCategory('notice'),
		{
			select: (res) => res.data.data.sort((a: { postId: number }, b: { postId: number }) => b.postId - a.postId)[0],
			onSuccess: (res) => {
				console.log(res);
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	return (
		<>
			{!isLoading && (
				<div>
					<Header workPlace={data?.workPlace ?? ''} hasNotice={hasNotice} />
					<main className="h-[100vh] bg-[#FCFCFF] w-[calc(100%+4rem)] px-[2rem] -translate-x-[2rem]">
						<HomeScreen
							grayData={grayData}
							WorkMutate={WorkMutate}
							todayWork={todayWork}
							userData={data}
							boardNoticeData={boardNoticeData}
						/>
					</main>
					<EasterEgg />
					<Navigation />
				</div>
			)}
		</>
	);
};

export default Home;
