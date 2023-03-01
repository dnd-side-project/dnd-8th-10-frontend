import type { NextPage } from 'next';
import BoardSearchScreen from 'src/app.features/board/screens/BoardSearchScreen';

const BoardSearchPage: NextPage = () => {
	return (
		<div className="h-[100vh]">
			<BoardSearchScreen />
		</div>
	);
};

export default BoardSearchPage;
