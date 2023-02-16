import PlusIcon from 'src/app.modules/assets/calendar/plus.svg';
import { ISalaryProps } from '../types';

function SalaryDetail({ data }: ISalaryProps) {
	return (
		<div className="mt-[2.4rem] p-[1.6rem] bg-g1 rounded-[0.8rem]">
			{data?.map((info, index) => (
				<div key={index} className="flex justify-between mb-[2rem] last:mb-0">
					<div className="flex items-center">
						<PlusIcon />
						<div className="flex flex-col justify-center ml-[0.8rem]">
							<span className="text-subhead2 text-g9">
								{info.month}월 {info.day}일
							</span>
							<span className="text-subhead1 text-g6">{info.workTime}</span>
						</div>
					</div>
					<div className="flex flex-col">
						<span className="text-subhead2 text-g9">
							{info.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
						</span>
						<span className="text-subhead1 text-g6 text-right">{info.workHour}시간</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default SalaryDetail;
