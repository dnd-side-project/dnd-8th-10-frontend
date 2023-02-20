import React from 'react';

interface Props {
	children?: React.ReactNode;
	className?: string;
}
function InfoBox({ children, className = '' }: Props) {
	return <div className={`p-[1.6rem] bg-g1 rounded-[0.8rem] ${className}`}>{children}</div>;
}

export default InfoBox;
