import React, { useState } from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import { IDumy } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore from 'swiper';
// 초기 캘린더 더미 상태
const today = new Date();
const dumyData = {
	year: today.getFullYear(),
	month: today.getMonth(),
	schedule: {
		박수빈: {
			일: '08:00~15:00',
			목: '14:00~24:00',
		},
	},
};
let data = 0;
function CalendarScreen() {
	const [calendar, setCalendar] = useState<IDumy>(dumyData);

	// 년도, 달, 일정
	const { year, month, schedule } = calendar;

	// 오늘 날짜
	const toDay = transIdx(today.getFullYear(), today.getMonth(), today.getDate());

	// 해당 달의 첫날과 마지막날
	const firstDay = Number(new Date(year, month, 1).getDay());
	const lastDate = Number(new Date(year, month + 1, 0).getDate());

	const onChangeMonth = (swiper: SwiperCore) => {
		if (swiper.swipeDirection === 'next') {
			if (month < 11) {
				setCalendar((prev) => ({
					...prev,
					month: month + 1,
				}));
			} else {
				setCalendar((prev) => ({
					...prev,
					month: 0,
					year: year + 1,
				}));
			}
		}
		if (swiper.swipeDirection === 'prev') {
			if (month > 0) {
				setCalendar((prev) => ({
					...prev,
					month: month - 1,
				}));
			} else {
				setCalendar((prev) => ({
					...prev,
					month: 11,
					year: year - 1,
				}));
			}
		}
	};
	return (
		<div>
			<Swiper
				loop
				initialSlide={month}
				simulateTouch={true}
				onSlideChangeTransitionStart={(swiper) => {
					onChangeMonth(swiper);
				}}
			>
				{[...new Array(12).fill('').map((v, i) => (v = i + 1))].map((data, index) => (
					<SwiperSlide key={index}>
						<div className="flex justify-between mx-[15px] my-[20px]">
							<div className="flex items-center">
								<span className="text-[20px] font-bold mr-[5px]">{`${year}.${month + 1}`}</span>
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
										month,
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
