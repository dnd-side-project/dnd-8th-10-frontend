import React from 'react';
import { useRouter } from 'next/router';

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	return <main className="max-w-[50rem] mx-auto px-[2rem] ">{children}</main>;
}

export default Layout;
