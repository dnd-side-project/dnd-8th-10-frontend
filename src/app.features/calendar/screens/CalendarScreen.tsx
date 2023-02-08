import React, { useEffect, useState } from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useMutation, useQuery } from '@tanstack/react-query';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import Modal from '../components/Modal';
import useStore from '../store';
import { getGray, getToDay, getWorkList, postWork } from '../api';

function CalendarScreen() {
	// // 더미 스케쥴
	const [schedule, _Setschedule] = useState([3, 6, 7]);
	const { isOpen } = useStore();
	const today = new Date();
	const [fakeYear, setFakeYear] = useState<number>(0);
	const [calendar, setCalendar] = useState({ year: today.getFullYear(), month: today.getMonth() });
	// 년도, 달, 일정
	const { year, month } = calendar;

	// 해당 달의 첫날과 마지막날
	const firstDay = Number(new Date(year, month, 1).getDay());
	const lastDate = Number(new Date(year, month + 1, 0).getDate());

	const onChangeMonth = (swiper: SwiperCore) => {
		// month와 monthView(스와이프) 동기화
		setCalendar((prev) => ({
			...prev,
			month: swiper.realIndex,
		}));

		// 다음 슬라이드
		if (swiper.swipeDirection === 'next') {
			if (month === 11) {
				setCalendar((prev) => ({
					...prev,
					month: 0,
					year: year + 1,
				}));
			}
		}
		// 이전 슬라이드
		if (swiper.swipeDirection === 'prev') {
			if (month === 0) {
				setCalendar((prev) => ({
					...prev,
					month: 11,
					year: year - 1,
				}));
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
	// 출근했던 회색 데이터
	// const { data, refetch: getGrayRefetch } = useQuery(['day'], getGray, {
	// 	onSuccess: (res) => {
	// 		console.log(res);
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 	},
	// });

	// 출근하기
	const { mutate: postWorkMutate } = useMutation(postWork, {
		onSuccess: (res) => {
			console.log(res);
		},
		onError: (error) => alert('오류 발생.'),
		onSettled: () => {
			//
		},
	});

	// useEffect(() => {
	// 	refetch();
	// }, [month]);
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
						<div className="flex justify-between mx-[15px] my-[20px]">
							<div className="flex items-center">
								<span className="text-[20px] font-bold mr-[5px]">{`${year + fakeYear}.${monthView + 1}`}</span>
								<div>버튼</div>
							</div>
							<div>아이콘</div>
						</div>
						<div>
							<div>
								<div className="flex justify-around mb-[5px]">
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
			{/* refetch,  mutate */}
			{isOpen && <Modal postWorkMutate={postWorkMutate} />}
		</div>
	);
}

export default CalendarScreen;
