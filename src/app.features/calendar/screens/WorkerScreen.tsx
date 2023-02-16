import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Header from 'src/app.components/Header';
import CtlIcon from 'src/app.modules/assets/calendar/controlW.svg';
import { getSalary } from '../api';
import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';
import useStore from '../store';
import { ISalaryData } from '../types';

function WorkerScreen() {
	// 직원 급여 페이지
	const { year, month } = useStore();
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
				<>
					<div className="text-center w-[calc(100%+4rem)] px-[2rem] pb-[2rem] -translate-x-[2rem] text-w bg-primary">
						<Header title={`${year}년 ${month + 1}월`}>
							<CtlIcon className="ml-[0.4rem]" />
						</Header>
						<TotalSalary data={workHour} />
					</div>
					<div>
						<SalaryDetail data={salaryData} />
					</div>
				</>
			)}
		</div>
	);
}

export default WorkerScreen;
