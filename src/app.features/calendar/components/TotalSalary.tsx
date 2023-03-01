import { useEffect, useState } from 'react';

interface props {
	data: number | undefined;
	wage?: number;
}
function TotalSalary({ data, wage }: props) {
	const [totalSalary, setTotalSalary] = useState<number>();

	useEffect(() => {
		if (data) {
			setTotalSalary(data * 9620);
		}
	}, [data]);

	return (
		<div
			className={`text-w flex flex-col justify-center ${
				wage ? 'h-[10.1rem]' : 'h-[7.4rem]'
			} items-center bg-transparent-30% rounded-[0.8rem] ${wage ? 'pb-[2.4rem]' : ''}`}
		>
			{wage && (
				<div className="mt-[2.4rem] mb-[0.6rem]">
					<span className="text-subhead1">시간당 {wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
				</div>
			)}

			<div>
				<span className="text-[2.6rem]">
					{totalSalary
						? totalSalary
								.toFixed(0)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						: '0'}
					<span className="text-subhead3">원</span>
				</span>
			</div>
		</div>
	);
}

export default TotalSalary;
