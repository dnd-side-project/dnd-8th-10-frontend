import { useEffect, useState } from 'react';

interface props {
	data: number | undefined;
	manager?: boolean;
}
function TotalSalary({ data, manager = false }: props) {
	const [totalSalary, setTotalSalary] = useState<number>();

	useEffect(() => {
		if (data) {
			setTotalSalary(data * 9620);
		}
	}, [data]);

	return (
		<div
			className={`text-w flex flex-col justify-center ${
				manager ? 'h-[10.1rem]' : 'h-[7.4rem]'
			} items-center bg-transparent-30% rounded-[0.8rem] ${manager ? 'pb-[2.4rem]' : ''}`}
		>
			{manager && (
				<div className="mt-[2.4rem] mb-[0.6rem]">
					<span className=" text-subhead1">시간당 9,620원</span>
				</div>
			)}

			<div>
				<span className="text-[2.6rem]">
					{totalSalary?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					<span className="text-subhead3">원</span>
				</span>
			</div>
		</div>
	);
}

export default TotalSalary;
