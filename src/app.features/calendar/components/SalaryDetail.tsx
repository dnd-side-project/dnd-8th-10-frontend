import { ISalaryProps } from '../types';

function SalaryDetail({ data }: ISalaryProps) {
	return (
		<div className="m-[2rem] p-[1.5rem] bg-[#F8F8FA] rounded-xl">
			{data?.map((info, index) => (
				<div key={index} className="p-[0.5rem] my-[1rem]">
					<div className="flex justify-between mb-[0.5rem]">
						<span>
							{info.month}월 {info.day}일
						</span>
						<span>{info.salary}원</span>
					</div>
					<div className="flex justify-between">
						<span>{info.workTime}</span>
						<span>{info.workHour}시간</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default SalaryDetail;
