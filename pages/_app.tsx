import '../styles/reset.css';
import '../styles/text.css';
import '../styles/checklist.css';
import '../styles/button.css';
import '../styles/globals.css';
import '../styles/swiper.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from 'src/app.components/Layout';
import useLocalUserStore from 'src/app.features/mypage/store/user';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				refetchOnMount: false,
				refetchOnReconnect: false,
				refetchOnWindowFocus: false,
			},
		},
	});
	const { initUser } = useLocalUserStore();
	useEffect(() => {
		initUser();
	}, []);
	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</QueryClientProvider>
	);
}

export default MyApp;
