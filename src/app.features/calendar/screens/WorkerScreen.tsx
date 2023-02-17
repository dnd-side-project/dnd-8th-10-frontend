import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import CtlIcon from 'src/app.modules/assets/calendar/controlW.svg';
import useModalStore from 'src/app.modules/store/modal';
import { getSalary } from '../api';
import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';
import useStore from '../store';
import { ISalaryData } from '../types';

function WorkerScreen() {
	// 직원 급여 페이지
	const { year, month, modalCalData } = useStore();
	const { isModalOpen, modalIsOpen } = useModalStore();
	const [salaryData, setSalaryData] = useState<ISalaryData[]>([]);
	const [workHour, setWorkHour] = useState<number>();
	const { data, isLoading } = useQuery(['salary'], () => getSalary({ year: String(year), month: String(month + 1) }), {
		onSuccess: (res) => {
			setSalaryData(res.data.data);
		},
		onError: (error) => {
			console.log(error);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const workHourFilter = salaryData.reduce((acc: number, current: { workHour: number }) => acc + current.workHour, 0);
		setWorkHour(workHourFilter);
	}, [salaryData]);
	return (
		<div>
			{!isLoading && (
				<div>
					<div className="w-[calc(100%+4rem)] px-[2rem]  -translate-x-[2rem] text-w bg-primary">
						<div className="pb-[5.6rem] mb-[1.6rem]">
							<Header title="" mode="white" />
							<div className="pointer-events-none h-[5.6rem] max-w-[50rem] -translate-x-[2rem] fixed z-50 flex mx-auto w-full items-center justify-center">
								<button
									type="button"
									className="flex items-center pointer-events-auto"
									onClick={() => {
										modalIsOpen();
										modalCalData('keypad');
									}}
								>
									<span className="text-w text-subhead4">
										{year}년 {month + 1}월
									</span>
									<CtlIcon className="ml-[0.4rem]" />
								</button>
							</div>
						</div>
						<div className="pb-[2rem]">
							<TotalSalary data={workHour} />
						</div>
					</div>
					<SalaryDetail data={salaryData} />
				</div>
			)}
		</div>
	);
}

export default WorkerScreen;
