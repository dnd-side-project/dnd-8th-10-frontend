import '../styles/reset.css';
import '../styles/text.css';
import '../styles/checklist.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from 'src/app.components/Layout';

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
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</QueryClientProvider>
	);
}

export default MyApp;
