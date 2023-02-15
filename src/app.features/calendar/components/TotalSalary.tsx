import { useEffect, useState } from 'react';

function TotalSalary({ data }: any) {
	const [totalSalary, setTotalSalary] = useState<number>();

	useEffect(() => {
		setTotalSalary(data * 9620);
	}, [data]);

	return (
		<div className="flex justify-between items-center px-[1.6rem] h-[6.4rem] bg-transparent-20% rounded-[0.8rem] text-subhead3">
			<span>이번달 급여</span>
			<span>{totalSalary?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
		</div>
	);
}

export default TotalSalary;
