import type { NextPage } from 'next';
import React from 'react';
import HomeScreen from 'src/app.features/home/screen/HomeScreen';
import Navigation from 'src/app.components/Navigation';

const Home: NextPage = () => {
	return (
		<div className="h-[100vh]">
			<HomeScreen />
			<Navigation />
		</div>
	);
};

export default Home;
