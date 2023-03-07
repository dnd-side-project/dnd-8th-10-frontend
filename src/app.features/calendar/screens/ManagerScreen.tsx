import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import TopModal from 'src/app.components/Modal/TopModal';
import Overlay from 'src/app.components/Modal/Overlay';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import CtlIcon from 'src/app.modules/assets/calendar/control.svg';
import EmptySalary from 'src/app.modules/assets/calendar/emptySalary.svg';
import ArrowRight from 'src/app.modules/assets/arrowRight.svg';
import ProfileImage from 'src/app.components/ProfileImage';
import useModal from 'src/app.modules/hooks/useModal';
import useStore from '../store';
import { ISalaryList } from '../types';
import Keypad from '../components/Modal/Keypad';
import { getSalaryList } from '../api';

function ManagerScreen() {
	// 점장 급여 페이지
	const { year, month, modalCalData, toDay } = useStore();
	const { isModalOpen, openModal, closeModal } = useModal();
	const router = useRouter();
	const [UserData, setUserData] = useState<ISalaryList[]>([]);
	const [manageData, setManageData] = useState<ISalaryList[]>([]);
	const { data, isLoading, refetch } = useQuery(
		['salaryList'],
		() => getSalaryList({ year: String(year), month: String(month + 1) }),
		{
			onSuccess: (res) => {
				const newSalaryData = res.data.data.filter((val: { role: string }) => val.role === 'MANAGER');
				if (newSalaryData.length > 0) {
					setManageData(newSalaryData);
				}
				setUserData(res.data.data.filter((val: { role: string }) => val.role !== 'MANAGER'));
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	useEffect(() => {
		refetch();
	}, [year, month]);

	return (
		<div>
			{!isLoading && (
				<>
					<div className="pb-[5.6rem]">
						<Header title="" />
						<div className="pointer-events-none h-[5.6rem] max-w-[42rem] -translate-x-[2rem] fixed z-50 flex mx-auto w-full items-center justify-center">
							<button
								type="button"
								className="flex items-center pointer-events-auto"
								onClick={() => {
									openModal();
									modalCalData('keypad');
								}}
							>
								<span className="text-g10 text-subhead4">
									{year}년 {month + 1}월
								</span>
								<CtlIcon className="ml-[0.4rem]" />
							</button>
						</div>
					</div>

					<div>
						{manageData[0]?.totalSalary > 0 && (
							<div className="pb-[0.6rem]">
								<div className="mt-[1.6rem] mb-[1.2rem]">
									<span className="text-subhead4 text-g9">점장</span>
								</div>
								<div className="flex justify-between items-center py-[2.4rem] bg-g1 rounded-[0.8rem] px-[1.6rem]">
									<div className="flex items-center">
										<ProfileImage size="lg" userProfileCode={manageData[0]?.userProfileCode} />
										<div className="flex flex-col justify-center ml-[1.2rem]">
											<span className="text-subhead3 text-g10">{manageData[0]?.userName}</span>
										</div>
									</div>
									<div className="flex">
										<div className="flex flex-col justify-center items-end">
											<span className="text-subhead3 text-primary ">
												{manageData[0]?.totalSalary
													.toFixed(0)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
												원
											</span>
											<span className="text-subhead1 text-g6">
												시간당 {manageData[0]?.wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
											</span>
										</div>
										<button
											type="button"
											onClick={() => router.push(`${SERVICE_URL.calendarSalaryDetail}/${manageData[0]?.userCode}`)}
										>
											<ArrowRight />
										</button>
									</div>
								</div>
							</div>
						)}

						{UserData.filter((salary) => salary.totalSalary !== 0).length > 0 ? (
							<div>
								<div className="mt-[1.6rem] mb-[1.2rem]">
									<span className="text-subhead4 text-g9">알바생</span>
								</div>
								{UserData.map((info, index) => (
									<div
										key={index}
										className="flex justify-between items-center py-[2.4rem] bg-g1 rounded-[0.8rem] px-[1.6rem] mb-[0.8rem]"
									>
										<div className="flex items-center">
											<ProfileImage size="lg" userProfileCode={info.userProfileCode} />
											<div className="flex flex-col justify-center ml-[1.2rem]">
												<span className="text-subhead3 text-g10">{info.userName}</span>
											</div>
										</div>
										<div className="flex">
											<div className="flex flex-col justify-center items-end">
												<span className="text-subhead3 text-primary ">
													{info.totalSalary
														.toFixed(0)
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													원
												</span>
												<span className="text-subhead1 text-g6">
													시간당 {info.wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
												</span>
											</div>

											<button
												type="button"
												onClick={() => router.push(`${SERVICE_URL.calendarSalaryDetail}/${info.userCode}`)}
											>
												<ArrowRight />
											</button>
										</div>
									</div>
								))}
							</div>
						) : (
							<div
								className={` ${
									manageData[0]?.totalSalary === 0 ? 'h-[80vh]' : 'h-[50vh]'
								} flex flex-col justify-center items-center`}
							>
								<EmptySalary />
								<span className="text-subhead3 text-g7">아직 근무자가 없어요</span>
							</div>
						)}
					</div>
				</>
			)}
			{isModalOpen && (
				<Overlay
					overlayClickFn={() =>
						setTimeout(() => {
							closeModal();
						}, 500)
					}
				>
					<TopModal bgColor="bg-g1">
						<Keypad year={year} month={month} />
					</TopModal>
				</Overlay>
			)}
		</div>
	);
}

export default ManagerScreen;
