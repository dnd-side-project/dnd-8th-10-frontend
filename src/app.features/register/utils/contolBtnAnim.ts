export const runningBtnAnim = () => {
	const saveBtn = document.getElementById('saveBtn');
	if (!saveBtn) return;
	saveBtn.style.animationName = 'expand';
	saveBtn.style.animationPlayState = 'running';
};
export const pauseBtnAnim = () => {
	const saveBtn = document.getElementById('saveBtn');
	if (!saveBtn) return;
	saveBtn.style.animationName = 'shrink';
	saveBtn.style.animationPlayState = 'running';
};
