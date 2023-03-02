import type { NextPage } from 'next';
import Navigation from 'src/app.components/Navigation';
import BoardScreen from 'src/app.features/board/screens/BoardScreen';

const BoardPage: NextPage = () => {
	return (
		<div className="min-h-[100vh] relative">
			<BoardScreen />
			<Navigation />
		</div>
	);
};

export default BoardPage;
