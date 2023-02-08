import React from 'react';

interface Props {
	searchDateHandler: (searchYear: number, searchMonth: number, searchDay: number) => void;
}
function CheckListScreen({ searchDateHandler }: Props) {
	return <div>CheckListScreen</div>;
}

export default CheckListScreen;
