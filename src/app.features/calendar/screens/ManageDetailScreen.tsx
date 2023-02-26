import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Header from 'src/app.components/Header';
import { getUserSalary } from '../api';
import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';
import useStore from '../store';
import { ISalaryDetail } from '../types';
import SettingIcon from 'src/app.modules/assets/calendar/salary/setting.svg';
import MoneyIcon from 'src/app.modules/assets/calendar/salary/money.svg';
import InfoIcon from 'src/app.modules/assets/calendar/salary/info.svg';

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
		}
	);
	console.log(salaryData?.totalSalary);
	return (
		<div>
			{!isLoading && salaryData && (
				<>
					<div className="w-[calc(100%+4rem)] px-[2rem] pb-[2rem] -translate-x-[2rem] text-w bg-primary">
						<div className="pb-[5.6rem]">
							<Header title="" mode="white" />
							<div className="pointer-events-none h-[5.6rem] max-w-[42rem] -translate-x-[2rem] fixed z-50 flex mx-auto w-full items-center justify-center">
								<div className="flex items-center pointer-events-auto">
									<span className="text-w text-subhead4">
										{salaryData.userName} {`${salaryData.role === 'MANAGER' ? '매니저' : '알바생'}`}
									</span>
									<SettingIcon className="fixed right-0 mr-[1.9rem]" />
								</div>
							</div>
						</div>
						<div className="flex justify-between mx-[0.2rem] mb-[0.8rem] mt-[1.6rem]">
							<div className="flex items-center">
								<MoneyIcon />
								<span className="text-subhead3 text-w ml-[0.4rem]">이번달 급여</span>
							</div>
							<div className="flex items-center">
								<InfoIcon />
								<span className="text-[1rem] text-w ml-[0.4rem]">세금 공제 전 금액입니다</span>
							</div>
						</div>
						<TotalSalary data={salaryData.totalSalary} manager />
					</div>
					<div className="w-[calc(100%+4rem)] px-[2rem] pb-[2rem] -translate-x-[2rem] bg-w">
						<SalaryDetail data={salaryData.daySalary} />
					</div>
				</>
			)}
		</div>
	);
}

export default ManageDetailScreen;
