import { useEffect, useState } from 'react';

function TotalSalary({ data }: any) {
	const [totalSalary, setTotalSalary] = useState<number>();

	useEffect(() => {
		setTotalSalary(data * 9620);
	}, [data]);

	return (
		<div className="flex justify-between p-[2rem] bg-[#5377b1] rounded-lg">
			<span>이번달 급여</span>
			<span>{totalSalary}원</span>
		</div>
	);
}

export default TotalSalary;
