import { useRouter } from 'next/router';
import React from 'react';
import BackIcon from '../../../app.modules/assets/back.svg';
import MoreIcon from '../../../app.modules/assets/more.svg';
import BoardContentView from '../components/BoardContentView';

interface Props {
	id: string | string[] | undefined;
}

function BoardViewScreen({ id }: Props) {
	const router = useRouter();
	return (
		<div>
			<header className="w-full h-[5.6rem] flex items-center justify-between mb-[1.6rem]">
				<button onClick={() => router.back()}>
					<BackIcon stroke="#66666E" />
				</button>
				<button>
					<MoreIcon />
				</button>
			</header>
			<BoardContentView id={id} />
		</div>
	);
}
export default BoardViewScreen;
