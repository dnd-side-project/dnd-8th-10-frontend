import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="ko">
			<Head>
				<title>슬편생</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,viewport-fit=cover"
					charSet="utf-8"
				/>
				<meta property="og:title" content="슬편생" />
				<meta property="og:url" content="https://www.wise24life.site" />
				<meta property="og:image" content="/images/thumbnail.png" />
				<meta property="og:description" content="슬기로운 편의점 생활! 슬편생과 함께 일하러 가볼까요?" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
