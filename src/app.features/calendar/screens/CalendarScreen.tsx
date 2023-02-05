import React, { useState } from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import { ISchedule } from '../types';

function CalendarScreen() {
	const [fakeYear, setFakeYear] = useState<number>(0);
	// 더미 스케쥴
	const [schedule, _Setschedule] = useState<ISchedule>({
		박수빈: {
			일: '08:00~15:00',
			목: '14:00~24:00',
		},
	});

	const today = new Date();
	const [calendar, setCalendar] = useState({ year: today.getFullYear(), month: today.getMonth() });
	// 년도, 달, 일정
	const { year, month } = calendar;
	// 금일
	const toDay = transIdx(today.getFullYear(), today.getMonth(), today.getDate());
	// 해당 달의 첫날과 마지막날
	const firstDay = Number(new Date(year, month, 1).getDay());
	const lastDate = Number(new Date(year, month + 1, 0).getDate());

	const onChangeMonth = (swiper: SwiperCore) => {
		// month와 monthView(스와이프) 동기화

		setCalendar((prev) => ({
			...prev,
			month: swiper.realIndex,
		}));

		setFakeYear(0);

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
		// 년도 미리보기 증가
		if (swiper.swipeDirection === 'next') {
			if (Number((progress * 10).toFixed(1)) % 1 > 0.1) {
				if (swiper.realIndex === 11) {
					setFakeYear(1);
				}
			}
		}
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
				{[...new Array(12)].map((_data, monthView) => (
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
										toDay,
									})}
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default CalendarScreen;
