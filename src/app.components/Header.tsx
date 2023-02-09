import React from 'react';

interface Props {
	title: string;
	children: React.ReactNode;
}
function Header({ title, children }: Props) {
	return (
		<header id="header" className="relative">
			Header
		</header>
	);
}

export default Header;
