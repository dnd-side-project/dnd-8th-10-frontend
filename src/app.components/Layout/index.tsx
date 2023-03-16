import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	useEffect(() => {
		const setProperty = () => {
			const vh = window.innerHeight * 0.01;
			console.log(vh, 'vh');
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};
		setProperty();
		window.addEventListener('resize', setProperty);
		return () => window.removeEventListener('resize', setProperty);
	}, []);
	return (
		<div id="app" className="max-w-[50rem] mx-auto px-[2rem] bg-w">
			{children}
		</div>
	);
}

export default Layout;
