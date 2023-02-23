import PlusIcon from 'src/app.modules/assets/calendar/plus.svg';
import EmptyWork from 'src/app.modules/assets/calendar/emptyWork.svg';
import { ISalaryProps } from '../types';

function SalaryDetail({ data }: ISalaryProps) {
	function convertWorkHour(workTime: number) {
		const hour = Math.floor(workTime);
		const minute = Math.round((workTime - hour) * 60);
		if (minute === 0) {
			return `${hour}시간`;
		}
		if (hour === 0) {
			return `${minute}분`;
		}
		return `${hour}시간 ${minute}분`;
	}

	return (
		<div>
			{data?.length ? (
				<div className="mt-[2.4rem] p-[1.6rem] bg-g1 rounded-[0.8rem]">
					{data
						.sort((a, b) => {
							return Number(b.day) - Number(a.day);
						})
						.map((info, index) => (
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
									<span className="text-subhead1 text-g6 text-right">{convertWorkHour(info.workHour)}</span>
								</div>
							</div>
						))}
				</div>
			) : (
				<div className="mt-[12rem] flex flex-col justify-center items-center">
					<EmptyWork />
					<span className="text-subhead3 text-g7">아직 근무내역이 없어요</span>
				</div>
			)}
		</div>
	);
}

export default SalaryDetail;
