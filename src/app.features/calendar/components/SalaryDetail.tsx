function SalaryDetail() {
	return (
		<div className="m-[2rem] p-[1.5rem] bg-[#F8F8FA] rounded-xl">
			{[...new Array(4)].map((_data, index) => (
				<div key={index} className="p-[0.5rem] my-[1rem]">
					<div className="flex justify-between mb-[0.5rem]">
						<span>1월 12일</span>
						<span>300,000원</span>
					</div>
					<div className="flex justify-between">
						<span>오전1:00~오후6:00</span>
						<span>5시간</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default SalaryDetail;
