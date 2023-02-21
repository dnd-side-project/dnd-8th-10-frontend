import React from 'react';
import Working from '../components/working';
import BoardBar from '../components/boardBar';
import MainPoster from '../components/MainPoster';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateBody } from 'src/app.features/calendar/api';

interface Props {
	grayData: number[];
	WorkMutate: MutateTpye<MutateBody>;
	todayWork: string;
}
function HomeScreen({ grayData, WorkMutate, todayWork }: Props) {
	return (
		<div>
			<Header />
			<MainPoster />
			<BoardBar />
			<Working grayData={grayData} WorkMutate={WorkMutate} todayWork={todayWork} />
			<Buttons />
		</div>
	);
}
export default HomeScreen;
