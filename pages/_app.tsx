import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
