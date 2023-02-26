import React from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateBody } from 'src/app.features/calendar/api';
import WorkStatus from '../components/WorkStatus';
import BoardPrivew from '../components/BoardPrivew';
import MainPoster from '../components/MainPoster';
import Shortcut from '../components/Shortcut';

interface Props {
	grayData: number[];
	WorkMutate: MutateTpye<MutateBody>;
	todayWork: string;
}
function HomeScreen({ grayData, WorkMutate, todayWork }: Props) {
	return (
		<div className="bg-[#FCFCFF] w-[calc(100%+4rem)] px-[2rem] -translate-x-[2rem] py-[5.6rem]">
			<MainPoster />
			<BoardPrivew />
			<WorkStatus grayData={grayData} WorkMutate={WorkMutate} todayWork={todayWork} />
			<Shortcut />
		</div>
	);
}
export default HomeScreen;
