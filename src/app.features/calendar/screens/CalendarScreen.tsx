import React, { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { useRouter } from 'next/router';
import TopModal from 'src/app.components/Modal/TopModal';
import useModalStore from 'src/app.modules/store/modal';
import Overlay from 'src/app.components/Modal/Overlay';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import useStore from '../store';
import { getGray, postWork } from '../api';
import Modal from '../components/Modal';

function CalendarScreen() {
	// // 더미 스케쥴
	const [schedule, setSchedule] = useState<number[]>([]);
	const { year, month, setCalendar } = useStore();
	const { isModalOpen } = useModalStore();

	const [fakeYear, setFakeYear] = useState<number>(0);

	const router = useRouter();
	// 년도, 달, 일정

	// 해당 달의 첫날과 마지막날
	const firstDay = Number(new Date(year, month, 1).getDay());
	const lastDate = Number(new Date(year, month + 1, 0).getDate());

	const onChangeMonth = (swiper: SwiperCore) => {
		// month와 monthView(스와이프) 동기화
		setCalendar(year, swiper.realIndex);

		// 다음 슬라이드
		if (swiper.swipeDirection === 'next') {
			if (month === 11) {
				setCalendar(0, year + 1);
			}
		}
		// 이전 슬라이드
		if (swiper.swipeDirection === 'prev') {
			if (month === 0) {
				setCalendar(11, year - 1);
			}
		}
	};
	const onChageFakeYear = (swiper: SwiperCore, progress: number) => {
		const valid = Number((progress * 10).toFixed(1)) % 1;
		// 다음 슬라이딩 년도 미리보기 증가

		if (swiper.swipeDirection === 'next') {
			// 우측 미리보기
			if (month === 11 && valid >= 0.19) {
				setFakeYear(1);
			}
			// 루프 초기화시 미리보기 안먹는 경우
			if (month === 11 && (valid === 0.1 || valid === 0.9)) {
				setFakeYear(0);
			}
		} else {
			setFakeYear(0);
		}
	};

	// 출근하기
	const { data: WorkData, mutate: WorkMutate } = useMutation(postWork, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => alert('오류 발생.'),
	});

	const { data, refetch: getGrayRefetch } = useQuery(
		['gray'],
		() =>
			getGray({
				year: String(year),
				month: String(month + 1),
			}),
		{
			onSuccess: (res) => {
				if (res.data.data.length === 1) {
					setSchedule(res.data.data.map(Number));
				} else {
					setSchedule(res.data.data.map(Number));
				}
			},
		}
	);
	useEffect(() => {
		getGrayRefetch();
	}, [month, getGrayRefetch, WorkData]);

	const salary = () => {
		router.push(`${SERVICE_URL.calendarSalary}`);
	};
	return (
		<div>
			<Swiper
				loop
				initialSlide={month}
				onSlideChangeTransitionStart={(swiper) => {
					onChangeMonth(swiper);
				}}
				onProgress={(swiper, progress) => {
					onChageFakeYear(swiper, progress);
				}}
				onTouchEnd={() => {
					setTimeout(() => {
						setFakeYear(0);
					}, 100);
				}}
			>
				{[...new Array(12)].map((_, monthView) => (
					<SwiperSlide key={monthView}>
						<div className="flex justify-between ">
							<div className="flex items-center">
								<span className="text-[2rem] font-bold mr-[0.5rem]">{`${year + fakeYear}.${monthView + 1}`}</span>
								<div>버튼</div>
							</div>
							<button type="button" onClick={() => salary()}>
								급여
							</button>
						</div>
						<div>
							<div>
								<div className="text-[1.5rem] flex justify-around">
									{WEEK.map((day, index) => (
										<span key={index}>{day}</span>
									))}
								</div>
								<div>
									{MakeCalendar({
										year,
										monthView,
										firstDay,
										lastDate,
										schedule,
									})}
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{isModalOpen && (
				<>
					<Overlay bgColor="" />
					<TopModal bgColor="bg-g1">
						<Modal WorkMutate={WorkMutate} />
					</TopModal>
				</>
			)}
		</div>
	);
}

export default CalendarScreen;
