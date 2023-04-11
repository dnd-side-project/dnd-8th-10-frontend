import React, { useEffect } from 'react';

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	useEffect(() => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		const isIOS = /iphone|ipad|ipod/.test(userAgent);
		if (isIOS) {
			const setProperty = () => {
				const vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			};
			setProperty();
		}
	}, []);

	return (
		<div id="app" className="app-wrap max-w-[50rem] mx-auto px-[2rem] bg-w">
			{children}
		</div>
	);
}

export default Layout;
