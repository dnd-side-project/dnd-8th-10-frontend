import React from 'react';

interface Props {
	classNames?: string;
}
function Divider({ classNames }: Props) {
	return <div className={`bg-g1 w-[calc(100%+4rem)] -translate-x-[2rem] h-[1.2rem] ${classNames}`} />;
}

export default Divider;
