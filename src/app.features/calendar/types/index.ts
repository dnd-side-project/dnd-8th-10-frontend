export interface IMakeCal {
	year: number;
	monthView: number;
	firstDay: number;
	lastDate: number;
	schedule: {
		month: number;
		day: number[];
	};
}

export interface ISalaryData {
	month: string;
	day: string;
	workTime: string;
	workHour: number;
	salary: number;
}

export interface ISalaryProps {
	data?: ISalaryData[];
}

export interface ISalaryList {
	totalSalary: number;
	userCode: number;
	userName: string;
	userProfileCode: number;
	wage: number;
}

export interface IDaySalary {
	month: string;
	day: string;
	salary: number;
	workTime: string;
	workHour: number;
}

export interface ISalaryDetail {
	userProfileCode: number;
	userName: string;
	role: string;
	workTime: string;
	daySalary: IDaySalary[];
	totalSalary: number;
	wage: number;
}
export interface Time {
	hour: string;
	minute: string;
	meridiem: 'am' | 'pm';
}
