import { useRouter } from 'next/router';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';
import useStore from '../store';

function ManagerScreen() {
	//점장 급여 페이지
	const { year, month } = useStore();
	const router = useRouter();
	return (
		<div className="text-[1.5rem]">
			<div className="text-center p-[0.2rem]">
				<div className="p-[0.5rem]">
					{year} {month + 1}월
				</div>
			</div>
			<div>
				<div className="mb-[4rem]">
					<div>매니저</div>
					<div
						onClick={() => router.push(`${SERVICE_URL.calendarSalaryDetail}/${99}`)}
						className="flex justify-between items-center bg-[#F8F8FA] p-[2rem] my-[1rem] rounded-xl"
					>
						<div className="flex">
							<div>
								<div>최영진</div>
								<div>1.1~1.31</div>
							</div>
						</div>
						<div>1,067,000원 {'>'}</div>
					</div>
				</div>
				<div>
					<div>알바생</div>
					{[...new Array(4)].map((_data, index) => (
						<div
							onClick={() => router.push(`${SERVICE_URL.calendarSalaryDetail}/${index}`)}
							key={index}
							className="flex justify-between items-center bg-[#F8F8FA] p-[2rem] my-[1rem] rounded-xl"
						>
							<div className="flex">
								<div>
									<div>최영진</div>
									<div>1.1~1.31</div>
								</div>
							</div>
							<div>1,067,000원 {'>'}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ManagerScreen;
