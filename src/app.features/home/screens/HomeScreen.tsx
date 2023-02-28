import React from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateBody } from 'src/app.features/calendar/api';
import WorkStatus from '../components/WorkStatus';
import BoardPreview from '../components/BoardPreview';
import MainPoster from '../components/MainPoster';
import Shortcut from '../components/Shortcut';

interface Props {
	grayData: number[];
	WorkMutate: MutateTpye<MutateBody>;
	todayWork: string;
	userData: {
		userName: string;
		workTime: string;
	};
}
function HomeScreen({ grayData, WorkMutate, todayWork, userData }: Props) {
	return (
		<div className="bg-[#FCFCFF] w-[calc(100%+4rem)] px-[2rem] -translate-x-[2rem] py-[5.6rem]">
			<MainPoster />
			<BoardPreview />
			<WorkStatus grayData={grayData} WorkMutate={WorkMutate} todayWork={todayWork} userName={userData?.userName} />
			<Shortcut />
		</div>
	);
}
export default HomeScreen;
