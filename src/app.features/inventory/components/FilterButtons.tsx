import React from 'react';

interface Props {
	filterHandler: (e: React.BaseSyntheticEvent) => void;

	filters: string[];
	selectedFilter: string;
}
function FilterButtons({ filterHandler, filters, selectedFilter }: Props) {
	return (
		<ul className="flex flex-wrap gap-x-[0.4rem] gap-y-[0.8rem] text-subhead2 ">
			{filters.map((item, index) => (
				<li key={index}>
					<button
						value={item}
						onClick={filterHandler}
						aria-pressed={selectedFilter === item}
						className="px-[1.05rem] py-[0.7rem] rounded-[0.8rem] border-[0.15rem] border-[#E8E8EB]  aria-pressed:bg-[#66666E]  aria-pressed:text-white aria-pressed:border-[#66666E]  "
					>
						{item}
					</button>
				</li>
			))}
		</ul>
	);
}

export default FilterButtons;
