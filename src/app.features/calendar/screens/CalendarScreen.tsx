import React, { useEffect, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { useRouter } from 'next/router';
import TopModal from 'src/app.components/Modal/TopModal';
import Overlay from 'src/app.components/Modal/Overlay';
import SalaryIcon from 'src/app.modules/assets/calendar/salary.svg';
import CtlIcon from 'src/app.modules/assets/calendar/control.svg';
import useModal from 'src/app.modules/hooks/useModal';
import MakeCalendar from '../components/MakeCalendar';
import { WEEK } from '../constants';
import useStore from '../store';
import { getGray } from '../api';
import ModalWrap from '../components/ModalWrap';
import useKeypadStore from '../store/keypad';

interface Props {
	currentUser: string;
}
function CalendarScreen({ currentUser }: Props) {
	const [schedule, setSchedule] = useState({
		month: 0,
		day: [],
	});
	const { year, month, setCalendar, modalCalData, isDayReset, setRecordComplete, recordComplete } = useStore();
	const { isModalOpen, openModal, closeModal, closeAnimationModal } = useModal();
	const { isJump, keypadChange } = useKeypadStore();
	const router = useRouter();

	// 해당 달의 첫날과 마지막날
	const firstDay = Number(new Date(year, month, 1).getDay());
	const lastDate = Number(new Date(year, month + 1, 0).getDate());

	const swiperRef = useRef<SwiperCore>();

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

	const { data, refetch: getGrayRefetch } = useQuery(
		['gray'],
		() =>
			getGray({
				year: String(year),
				month: String(month + 1),
			}),
		{
			select: (res) => res.data.data,
			onSuccess: (res) => {
				if (res) {
					setSchedule({
						month,
						day: res.map(Number),
					});
				}
			},
		}
	);

	useEffect(() => {
		// 달력 변경시, 해당 달의 출근이력 갱신
		getGrayRefetch();
		// 점프는 키패드로 달 이동할 때 swiper 이동 동기화
		if (isJump) {
			swiperRef.current?.slideToLoop(month, 0, false);
			keypadChange();
		}
	}, [month, getGrayRefetch, isJump]);

	useEffect(() => {
		if (recordComplete) {
			openModal();
			setRecordComplete();
		} else {
			isDayReset();
		}
	}, []);

	return (
		<div className="bg-w pb-[5.6rem] h-screen">
			<header className="w-full h-[5.6rem] flex items-center justify-between relative">
				<div className="cursor-pointer">
					<button
						className="flex items-center"
						type="button"
						onClick={() => {
							// 모달을 열고 모달의 타입은 keypad
							openModal();
							modalCalData('keypad');
						}}
					>
						<span className="text-g10 text-subhead4 mr-[0.4rem]">{`${year}년 ${month + 1}월`}</span>
						<CtlIcon />
					</button>
				</div>
			</header>
			<div className="mt-[2.4rem] mx-[0.2rem]">
				<ul className="flex mb-[2.1rem] justify-between">
					{WEEK.map((day, index) => (
						<li
							className="first:text-g7 last:text-g7 text-body2 w-[2.8rem] h-[2rem] text-center mr-[2rem] last:mr-0"
							key={index}
						>
							{day}
						</li>
					))}
				</ul>
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
							<ul className="mx-[0.2rem]">
								{MakeCalendar({
									year,
									monthView,
									firstDay,
									lastDate,
									schedule,
									openModal,
								})}
							</ul>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="fixed bottom-0 left-0 right-0 mb-[8rem] flex flex-col justify-center items-center">
				<div className="mb-[1.2rem]">
					<span className="text-subhead1 text-g8">지금까지 일한 급여를 계산해 보세요.</span>
				</div>
				<button
					type="button"
					onClick={() => router.push(`${SERVICE_URL.calendarSalary}`)}
					className="cursor-pointer w-[15.8rem] h-[4.8rem] flex items-center justify-center rounded-[2.4rem] bg-primary text-w text-subhead3"
				>
					<SalaryIcon fill="#FFFFFF" /> <span className="ml-[1.1rem]">급여 계산기</span>
				</button>
			</div>
			{isModalOpen && (
				<Overlay
					overlayClickFn={() => {
						closeAnimationModal();
						setTimeout(() => {
							isDayReset();
						}, 500);
					}}
				>
					<TopModal bgColor="bg-g1">
						<ModalWrap currentUser={currentUser} closeModal={closeModal} />
					</TopModal>
				</Overlay>
			)}
		</div>
	);
}

export default CalendarScreen;
