import React, { useEffect, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { useRouter } from 'next/router';
import TopModal from 'src/app.components/Modal/TopModal';
import useModalStore from 'src/app.modules/store/modal';
import Overlay from 'src/app.components/Modal/Overlay';
import SalaryIcon from 'src/app.modules/assets/calendar/salary.svg';
import CtlIcon from 'src/app.modules/assets/calendar/control.svg';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import useStore from '../store';
import { getGray, postWork } from '../api';
import Modal from '../components/Modal';
import useKeypadStore from '../store/keypad';

function CalendarScreen() {
	const [schedule, setSchedule] = useState({
		month: 0,
		day: [],
	});
	const { year, month, setCalendar, modalCalData } = useStore();
	const { isModalOpen, modalIsOpen } = useModalStore();
	const { isJump, keypadChange } = useKeypadStore();
	const router = useRouter();

	// 해당 달의 첫날과 마지막날
	const firstDay = Number(new Date(year, month, 1).getDay());
	const lastDate = Number(new Date(year, month + 1, 0).getDate());

	const onChangeMonth = (swiper: SwiperCore) => {
		setCalendar(year, swiper.realIndex);

		// 다음 슬라이드
		if (swiper.swipeDirection === 'next') {
			if (month === 11) {
				setCalendar(year + 1, 0);
			}
		}
		// 이전 슬라이드
		if (swiper.swipeDirection === 'prev') {
			if (month === 0) {
				setCalendar(year - 1, 11);
			}
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
					setSchedule({
						month,
						day: res.data.data.map(Number),
					});
				} else {
					setSchedule({
						month,
						day: res.data.data.map(Number),
					});
				}
			},
		}
	);

	const swiperRef = useRef<SwiperCore>();
	useEffect(() => {
		getGrayRefetch();
		if (isJump) {
			swiperRef.current?.slideToLoop(month, 0, false);
			keypadChange();
		}
	}, [month, getGrayRefetch, WorkData, isJump]);

	const salary = () => {
		router.push(`${SERVICE_URL.calendarSalary}`);
	};

	return (
		<div className="bg-w pb-[5.6rem]">
			<header className="w-full h-[5.6rem] flex items-center justify-between relative">
				<div className="cursor-pointer flex items-center h-[2.2rem] justify-between">
					<button
						className="flex items-center"
						type="button"
						onClick={() => {
							modalIsOpen();
							modalCalData('keypad');
						}}
					>
						<span className="text-g10 text-subhead4 mr-[0.4rem]">{`${year}년 ${month + 1}월`}</span>
						<CtlIcon />
					</button>
				</div>
				<button className="cursor-pointer" type="button" onClick={() => salary()}>
					<SalaryIcon />
				</button>
			</header>
			<div className="mt-[2.4rem] mx-[0.2rem]">
				<div className="flex mb-[2.1rem] justify-between">
					{WEEK.map((day, index) => (
						<span className="text-body2 w-[2.8rem] h-[2rem] text-center mr-[2rem] last:mr-0" key={index}>
							{day}
						</span>
					))}
				</div>
			</div>
			<div className="w-[calc(100%+1.8rem)] -translate-x-[0.8rem]">
				<Swiper
					loop
					initialSlide={month}
					onSlideChangeTransitionStart={(swiper) => {
						onChangeMonth(swiper);
					}}
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
				>
					{[...new Array(12)].map((_, monthView) => (
						<SwiperSlide key={monthView}>
							<div className="mx-[0.2rem]">
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
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			{isModalOpen && (
				<>
					<Overlay>
						<TopModal bgColor="bg-g1">
							<Modal WorkMutate={WorkMutate} />
						</TopModal>
					</Overlay>
				</>
			)}
		</div>
	);
}

export default CalendarScreen;
