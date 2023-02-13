import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getUserSalary } from '../api';
import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';
import useStore from '../store';
import { ISalaryDetail } from '../types';

function ManageDetailScreen({ id }: { id: string | string[] | undefined }) {
	// 급여 상세페이지
	const { year, month } = useStore();
	const [salaryData, setSalaryData] = useState<ISalaryDetail>();
	const { data, isLoading } = useQuery(
		['salaryList'],
		() => getUserSalary({ year: String(year), month: String(month + 1), userCode: Number(id) }),
		{
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
		}
	);

	return (
		<div className="text-[1.5rem]">
			<div className="text-white bg-[#5696FC] p-[2rem]">
				<div>
					<div>
						{salaryData?.userName} {salaryData?.role}
					</div>
					<div>
						<span>{salaryData?.workTime}</span>
					</div>
				</div>
				<TotalSalary data={salaryData?.totalSalary} />
			</div>
			<div>
				<SalaryDetail data={salaryData?.daySalary} />
			</div>
		</div>
	);
}

export default ManageDetailScreen;
