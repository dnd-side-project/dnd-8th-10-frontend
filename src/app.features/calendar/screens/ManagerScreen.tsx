import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import { getDaysInMonth } from 'src/app.modules/util/calendar';
import { getSalaryList } from '../api';
import useStore from '../store';
import { ISalaryList } from '../types';

function ManagerScreen() {
	// 점장 급여 페이지
	const { year, month } = useStore();
	const router = useRouter();
	const [salaryData, setSalaryData] = useState<ISalaryList[]>([]);
	const { data, isLoading } = useQuery(
		['salaryList'],
		() => getSalaryList({ year: String(year), month: String(month + 1) }),
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
			{!isLoading && (
				<>
					<div className="text-center p-[0.2rem]">
						<div className="p-[0.5rem]">
							{year} {month + 1}월
						</div>
					</div>
					<div>
						<div>
							<div>알바생</div>
							{salaryData.map((info, index) => (
								<div
									key={index}
									className="flex justify-between items-center bg-[#F8F8FA] p-[2rem] my-[1rem] rounded-xl"
								>
									<div className="flex">
										<div>
											<div>{info.userName}</div>
											<div>{getDaysInMonth(year, month)}</div>
										</div>
									</div>
									<div>
										<span>{info.totalSalary}</span>
										<button
											type="button"
											onClick={() => router.push(`${SERVICE_URL.calendarSalaryDetail}/${info.userCode}`)}
										>
											{'>'}
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default ManagerScreen;
