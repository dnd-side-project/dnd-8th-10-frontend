import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useRegisterUserStore from '../store/time';
import SetTimeButtons from 'src/app.components/SetTimeButtons';
type Flag = 'startTime' | 'endTime' | null;
function WorkModifyScreen() {
	const router = useRouter();
	const {
		user: { startTime, endTime },
		setTime,
	} = useRegisterUserStore();
	const [openModalFlag, setOpenModalFlag] = useState<Flag>(null);
	const timeHandler = (e: React.BaseSyntheticEvent) => {
		const {
			target: { name, value },
		} = e;

		setTime(value, name, openModalFlag as 'startTime' | 'endTime');
	};
	// 수정하기
	// const { mutate } = useMutation(putWorkModify, {
	// 	onSuccess: (res) => {
	// 		console.log(res);
	// 	},
	// 	onError: (error) => alert('오류 발생.'),
	// 	onSettled: () => {
	// 		//
	// 	},
	// });
	return (
		<div className="text-[2rem] mx-[1.5rem] my-[2rem]">
			<div>출근수정</div>
			<button>삭제</button>
			<div className="flex items-center my-3">
				<button
					onClick={() => setOpenModalFlag('startTime')}
					className="w-[50%] px-[1.5rem] py-[1.5rem] bg-white rounded-lg"
				>
					{startTime.hour}시 {startTime.minute}분 {startTime.meridiem}
				</button>
				<span className="mx-[10px]">~</span>
				<button
					onClick={() => setOpenModalFlag('endTime')}
					className="w-[50%] px-[1.5rem] py-[1.5rem] bg-white rounded-lg"
				>
					{endTime.hour}시 {endTime.minute}분 {endTime.meridiem}
				</button>
			</div>
			<div>
				<SetTimeButtons timeHandler={timeHandler} time={openModalFlag === 'startTime' ? startTime : endTime} />
			</div>
			<div className="mt-5 mb-7">
				<button type="button" className="bg-[#D9D9D9] w-full py-[2rem] font-semibold rounded-lg">
					수정
				</button>
			</div>
		</div>
	);
}

export default WorkModifyScreen;
