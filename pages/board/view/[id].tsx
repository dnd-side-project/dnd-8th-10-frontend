import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import BoardViewScreen from 'src/app.features/board/screens/BoardViewScreen';

const ViewPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div className="h-[100vh]">
			<BoardViewScreen id={id} />
		</div>
	);
};

export default ViewPage;
