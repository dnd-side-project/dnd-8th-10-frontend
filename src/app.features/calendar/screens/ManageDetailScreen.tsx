import SalaryDetail from '../components/SalaryDetail';
import TotalSalary from '../components/TotalSalary';

function ManageDetailScreen({ id }: { id: string | string[] | undefined }) {
	// 급여 상세페이지
	return (
		<div className="text-[1.5rem]">
			<div className="text-white bg-[#5696FC] p-[2rem]">
				<div>
					<div>최영진 알바생</div>
					<div>
						<span>화(9:00-12:00)</span>
						<span>토(9:00-12:00)</span>
					</div>
				</div>
				<TotalSalary />
			</div>
			<div>
				<SalaryDetail />
			</div>
		</div>
	);
}

export default ManageDetailScreen;
