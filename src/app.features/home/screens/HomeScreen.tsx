import React from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateBody } from 'src/app.features/calendar/api';
import Working from '../components/Working';
import BoardBar from '../components/BoardBar';
import MainPoster from '../components/MainPoster';
import Header from '../components/Header';
import Buttons from '../components/Buttons';

interface Props {
	grayData: number[];
	WorkMutate: MutateTpye<MutateBody>;
	todayWork: string;
}
function HomeScreen({ grayData, WorkMutate, todayWork }: Props) {
	return (
		<div className="bg-[#FCFCFF] w-[calc(100%+4rem)] px-[2rem] -translate-x-[2rem] py-[5.6rem]">
			<MainPoster />
			<BoardBar />
			<Working grayData={grayData} WorkMutate={WorkMutate} todayWork={todayWork} />
			<Buttons />
		</div>
	);
}
export default HomeScreen;