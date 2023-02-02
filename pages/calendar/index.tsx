import type { NextPage } from 'next';
import CalendarScreen from 'src/app.features/calendar/screens/CalendarScreen';

const CalendarPage: NextPage = () => {
	return (
		<div className="flex h-screen flex-col justify-between  bg-slate-50">
			<CalendarScreen />
		</div>
	);
};

export default CalendarPage;
