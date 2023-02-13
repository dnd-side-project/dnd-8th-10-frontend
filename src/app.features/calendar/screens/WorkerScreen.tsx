import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
		const workHour = salaryData.reduce((acc: number, current: { workHour: number }) => acc + current.workHour, 0);
		setWorkHour(workHour);
	}, [salaryData]);
	return (
		<div className="text-[1.5rem]">
			{!isLoading && (
				<>
					<div className="text-center text-white bg-[#5696FC] p-[0.2rem]">
						<div className="p-[0.5rem]">
							{year} {month + 1}월
						</div>
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
