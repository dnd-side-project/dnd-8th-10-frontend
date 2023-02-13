import { ISalaryProps } from '../types';

function SalaryDetail({ data }: ISalaryProps) {
	return (
		<div className="m-[2rem] p-[1.5rem] bg-[#F8F8FA] rounded-xl">
			{data?.map((data, index) => (
				<div key={index} className="p-[0.5rem] my-[1rem]">
					<div className="flex justify-between mb-[0.5rem]">
						<span>
							{data.month}월 {data.day}일
						</span>
						<span>{data.salary}원</span>
					</div>
					<div className="flex justify-between">
						<span>{data.workTime}</span>
						<span>{data.workHour}시간</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default SalaryDetail;
