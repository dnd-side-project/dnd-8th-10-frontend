import React, { useEffect } from 'react';

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	useEffect(() => {
		const setProperty = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};
		setProperty();
		window.addEventListener('resize', setProperty);
		return () => window.removeEventListener('resize', setProperty);
	}, []);
	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
	};
	return (
		<div id="app" onContextMenu={handleContextMenu} className="app-wrap max-w-[50rem] mx-auto px-[2rem] bg-w">
			{children}
		</div>
	);
}

export default Layout;
