import React from 'react';
import Tap from 'src/app.components/app.base/Button/Tap';

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
					<Tap item={item} value={item} onClick={filterHandler} isPressed={selectedFilter === item} />
				</li>
			))}
		</ul>
	);
}

export default FilterButtons;
