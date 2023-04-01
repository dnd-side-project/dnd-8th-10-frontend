import Head from 'next/head';

interface Props {
	title: string;
}

const TitleHead = ({ title }: Props) => {
	return (
		<Head>
			<title>{`${title} - 슬편생`}</title>
		</Head>
	);
};

export default TitleHead;
