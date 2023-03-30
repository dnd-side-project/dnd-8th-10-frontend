/**
 * 한국 기준 오늘 날짜 관련 정보 계산 함수(year,month,date,day)
 * @return year: number; month: number; date: number; day: number
 */
export const getKoreaTodayDateInfo = (): { year: number; month: number; date: number; day: number } => {
	const DATE = new Date(); // 현재 날짜(로컬 기준) 가져오기
	const utc = DATE.getTime() + DATE.getTimezoneOffset() * 60 * 1000; // utc 표준시 도출
	const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
	const today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();
	const day = today.getDay();
	return {
		year,
		month,
		date,
		day,
	};
};
