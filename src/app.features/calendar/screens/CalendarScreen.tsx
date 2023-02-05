import React, { useState } from 'react';
import { transIdx } from 'src/app.modules/util/calendar';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import { ISchedule } from '../types';
import SetTimeButtons from 'src/app.components/SetTimeButtons';
import useRegisterUserStore from 'src/app.features/register/store';
type Flag = 'startTime' | 'endTime' | null;
function CalendarScreen() {
	// 더미 스케쥴
	const [schedule, _Setschedule] = useState<ISchedule>({
		박수빈: {
			일: '08:00~15:00',
			목: '14:00~24:00',
		},
	});

	const today = new Date();
	const [fakeYear, setFakeYear] = useState<number>(0);
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
	const {
		user: { startTime, endTime },
		setTime,
	} = useRegisterUserStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
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
			<div className="z-10  bg-[#F8F8F8] w-screen  absolute bottom-0 flex-col items-center justify-center">
				<div className="flex justify-center mt-3">
					<div className="w-[55px] h-[4px] bg-[#D9D9D9] rounded-lg"></div>
				</div>
				<div className="px-[20px] py-[40px]">
					<div className="flex">
						<div className="w-[50%] font-semibold">시작</div>
						<div className="w-[50%] font-semibold">종료</div>
					</div>
					<div className="flex items-center my-3">
						<div
							className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg"
							onClick={() => setOpenModalFlag('startTime')}
						>
							{startTime.meridiem} {startTime.hour}시 {startTime.minute}분
						</div>
						<span className="mx-[10px]">~</span>
						<div
							className="w-[50%] px-[15px] py-[15px] bg-white rounded-lg"
							onClick={() => setOpenModalFlag('endTime')}
						>
							{endTime.meridiem} {endTime.hour}시 {endTime.minute}분
						</div>
					</div>
					{openModalFlag !== null && (
						<div>
							<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
						</div>
					)}
					<div className="mt-5 mb-7">
						<button
							className="bg-[#D9D9D9] w-full py-[20px] font-semibold rounded-lg"
							onClick={() => setOpenModalFlag(null)}
						>
							출근하기
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CalendarScreen;
