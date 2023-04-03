import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import Overlay from 'src/app.components/Modal/Overlay';
import TopModal from 'src/app.components/Modal/TopModal';
import CtlIcon from 'src/app.modules/assets/calendar/controlW.svg';
import SettingIcon from 'src/app.modules/assets/calendar/salary/setting.svg';
import MoneyIcon from 'src/app.modules/assets/calendar/salary/money.svg';
import InfoIcon from 'src/app.modules/assets/calendar/salary/info.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { useRouter } from 'next/router';
import useModal from 'src/app.modules/hooks/useModal';
import useUser from 'src/app.modules/hooks/user/useUser';
import { getSalary } from '../api';
import Keypad from '../components/Modal/Keypad';
import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';
import useStore from '../store';
import { ISalaryData } from '../types';

function WorkerScreen() {
	// 직원 급여 페이지
	const { year, month, modalCalData } = useStore();
	const { isModalOpen, openModal, closeAnimationModal } = useModal();

	const [salaryData, setSalaryData] = useState<ISalaryData[]>([]);
	const [workHour, setWorkHour] = useState<number>();
	const router = useRouter();
	const { data: userData, isLoading: userLoading } = useUser();
	const { data, isLoading, refetch } = useQuery(
		['salary'],
		() => getSalary({ year: String(year), month: String(month + 1) }),
		{
			select: (res) => res.data.data,
			onSuccess: (res) => {
				setSalaryData(res);
				const workHourFilter = res.reduce((acc: number, current: { workHour: number }) => acc + current.workHour, -1);
				setWorkHour(workHourFilter);
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
				<div>
					<div className="w-[calc(100%+4rem)] px-[2rem]  -translate-x-[2rem] text-w bg-primary">
						<div className="pb-[5.6rem] mb-[1.6rem]">
							<Header title="" mode="white" />
							<div className="pointer-events-none h-[5.6rem] max-w-[50rem] -translate-x-[2rem] fixed z-[101] flex mx-auto w-full items-center justify-center">
								<button
									type="button"
									className="flex items-center pointer-events-auto"
									onClick={() => {
										openModal();
										modalCalData('keypad');
									}}
								>
									<span className="text-w text-subhead4">
										{year}년 {month + 1}월
									</span>
									<CtlIcon className="ml-[0.4rem]" />
								</button>
								<button
									className="fixed right-0 mr-[1.9rem] pointer-events-auto"
									onClick={() => router.push(SERVICE_URL.editWage)}
								>
									<SettingIcon />
								</button>
							</div>
						</div>
						<div className="flex items-center mx-[0.2rem] mb-[0.8rem] mt-[1.6rem]">
							<MoneyIcon />
							<span className="text-subhead3 text-w ml-[0.4rem]">이번달 급여</span>
						</div>
						<div className="pb-[1rem]">
							<TotalSalary data={workHour} wage={userData.wage} />
						</div>
						<div className="mx-[0.2rem] pb-[2rem]">
							<div className="flex items-center">
								<InfoIcon />
								<span className="text-[1rem] text-w ml-[0.4rem]">세금 공제 전 금액입니다</span>
							</div>
							<div className="flex items-center">
								<InfoIcon />
								<span className="text-[1rem] text-w ml-[0.4rem]">
									개인 확인용으로, 실제 급여에는 반영되지 않을 수도 있습니다.
								</span>
							</div>
						</div>
					</div>
					<div className="w-[calc(100%+4rem)] px-[2rem] pb-[2rem] -translate-x-[2rem] bg-w">
						<SalaryDetail data={salaryData} />
					</div>
				</div>
			)}
			{isModalOpen && (
				<>
					<Overlay overlayClickFn={() => closeAnimationModal()}>
						<TopModal bgColor="bg-g1">
							<Keypad year={year} month={month} />
						</TopModal>
					</Overlay>
				</>
			)}
		</div>
	);
}

export default WorkerScreen;
