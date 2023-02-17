import React from 'react';
import { useRouter } from 'next/router';

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	return (
		<div id="app" className="max-w-[42rem] mx-auto px-[2rem] bg-w">
			{children}
		</div>
	);
}

export default Layout;
