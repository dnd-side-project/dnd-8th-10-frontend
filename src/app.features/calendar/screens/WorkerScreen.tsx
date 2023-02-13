import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';
import useStore from '../store';

function WorkerScreen() {
	// 직원 급여 페이지
	const { year, month } = useStore();
	return (
		<div className="text-[1.5rem]">
			<div className="text-center text-white bg-[#5696FC] p-[0.2rem]">
				<div className="p-[0.5rem]">
					{year} {month + 1}월
				</div>
				<TotalSalary />
			</div>
			<div>
				<SalaryDetail />
			</div>
		</div>
	);
}

export default WorkerScreen;
