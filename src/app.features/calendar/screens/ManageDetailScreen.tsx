import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ProfileImage from 'src/app.components/ProfileImage';
import Header from 'src/app.components/Header';
import { getUserSalary } from '../api';
import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';
import useStore from '../store';
import { ISalaryDetail } from '../types';

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
							<div className="flex items-center ml-[0.8rem]">
								<ProfileImage round userProfileCode={salaryData.userProfileCode} />
								<div className="ml-[1.6rem]">
									<span className="text-w text-subhead4">{salaryData.userName}</span>
									<span className="text-g3 text-subhead3 ml-[0.8rem]">
										{salaryData.role === 'MANAGER' ? '점장' : '알바생'}
									</span>

									<div className="flex">
										{salaryData.workTime.includes(',') ? (
											salaryData.workTime.split(',').map((work, index) => (
												<div
													key={index}
													className="bg-g9 w-fit rounded-[0.4rem] py-[0.2rem] px-[0.8rem] mt-[0.8rem] mr-[0.8rem]"
												>
													<span className="text-w text-body1">{work}</span>
												</div>
											))
										) : (
											<div className="bg-g9 w-fit rounded-[0.4rem] py-[0.2rem] px-[0.8rem] mt-[0.8rem]">
												<span className="text-w text-body1">{salaryData.workTime.split(',')[0]}</span>
											</div>
										)}
									</div>
								</div>
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
