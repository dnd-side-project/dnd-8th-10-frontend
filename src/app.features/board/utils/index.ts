export const categoryMapEng: { [key: string]: string } = {
	전체: 'all',
	공지: 'notice',
	전달: 'pesonalNotice',
	교육: 'education',
	대타구함: 'cover',
	질문: 'question',
};
export const categoryMapKr: { [key: string]: string } = {
	all: '전체',
	notice: '공지',
	pesonalNotice: '전달',
	education: '교육',
	cover: '대타구함',
	question: '질문',
};

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const minute = 60 * 1000;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	if (diff < hour) {
		if (Math.floor(diff / minute) === 0) {
			return '방금 전';
		}
		return `${Math.floor(diff / minute)}분 전`;
	}
	if (diff < day) {
		return `${Math.floor(diff / hour)}시간 전`;
	}
	if (diff < week) {
		return `${Math.floor(diff / day)}일 전`;
	}
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const days = `0${date.getDate()}`.slice(-2);
	const hours = `0${date.getHours()}`.slice(-2);
	const minutes = `0${date.getMinutes()}`.slice(-2);
	return `${year}.${month}.${days}. ${hours}:${minutes}`;
};
