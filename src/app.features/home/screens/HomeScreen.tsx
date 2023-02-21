import React from 'react';
import Working from '../components/working';
import BoardBar from '../components/boardBar';
import MainPoster from '../components/MainPoster';
import Header from '../components/Header';
import Buttons from '../components/Buttons';
function HomeScreen() {
	return (
		<div>
			<Header />
			<MainPoster />
			<BoardBar />
			<Working />
			<Buttons />
		</div>
	);
}
export default HomeScreen;
