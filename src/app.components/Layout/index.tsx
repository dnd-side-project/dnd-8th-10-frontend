import React from 'react';
import { useRouter } from 'next/router';

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	return <body className="max-w-[50rem] mx-auto px-[2rem] ">{children}</body>;
}

export default Layout;
