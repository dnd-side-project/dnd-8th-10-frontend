import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProfileImage from 'src/app.components/ProfileImage';
import Header from 'src/app.components/Header';
import { getUserSalary } from '../api';
import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';
import useStore from '../store';
import { ISalaryDetail } from '../types';
import Profile from 'src/app.components/Profile';

function ManageDetailScreen({ id }: { id: string | string[] | undefined }) {
	// 급여 상세페이지
	const { year, month, toDay } = useStore();
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
	// {month + 1 === Number(toDay.split('.')[1]) &&
	return (
		<div>
			{!isLoading && salaryData && (
				<>
					<div className="w-[calc(100%+4rem)] px-[2rem] pb-[2rem] -translate-x-[2rem] text-w bg-primary">
						<div className="pb-[5.6rem]">
							<Header title="" mode="white" />
						</div>

						<div className="mt-[1.6rem] mb-[2rem]">
							<div className="ml-[0.8rem]">
								<Profile userData={salaryData} />
							</div>
						</div>
						<TotalSalary data={salaryData.totalSalary} />
					</div>
					<div>
						<SalaryDetail data={salaryData.daySalary} />
					</div>
				</>
			)}
		</div>
	);
}

export default ManageDetailScreen;
