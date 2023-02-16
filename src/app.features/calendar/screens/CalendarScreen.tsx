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
import SalaryIcon from 'src/app.modules/assets/calendar/salary.svg';
import CtlIcon from 'src/app.modules/assets/calendar/control.svg';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import useStore from '../store';
import { getGray, postWork } from '../api';
import Modal from '../components/Modal';
import useKeypadStore from '../store/keypad';

function CalendarScreen() {
	const [schedule, setSchedule] = useState<number[]>([]);
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
			<Swiper
				loop
				initialSlide={month}
				onSlideChangeTransitionStart={(swiper) => {
					onChangeMonth(swiper);
				}}
				onTouchStart={(swiper) => {
					if (isJump) {
						swiper.slideToLoop(month, 0, false);
						keypadChange();
					}
				}}
			>
				{[...new Array(12)].map((_, monthView) => (
					<SwiperSlide key={monthView}>
						<div className="mx-[0.2rem]">
							<div className="flex justify-between mt-[2.4rem] mb-[2.6rem]">
								{WEEK.map((day, index) => (
									<span className="text-body2 w-[2.8rem] h-[2rem] text-center" key={index}>
										{day}
									</span>
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
