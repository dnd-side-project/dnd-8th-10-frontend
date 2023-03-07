interface Props {
	yesFn: () => void;
	noFn: () => void;
	cancelFn: () => void;
}

function BoardModal({ yesFn, noFn, cancelFn }: Props) {
	return (
		<div
			role="dialog"
			aria-modal="true"
			className="z-[101] w-full px-[2rem] text-center fixed  max-w-[42rem] left-[50%] bottom-0 translate-x-[-50%] mb-[2rem]"
		>
			<div className="bg-w rounded-[0.8rem]">
				<div className="border-solid border-b-[0.1rem] border-b-g3">
					<button type="button" onClick={() => yesFn()} className="text-primary text-body3 w-full h-[5.6rem]">
						수정
					</button>
				</div>
				<div className="">
					<button type="button" onClick={() => noFn()} className="text-secondary text-body3 w-full h-[5.6rem]">
						삭제
					</button>
				</div>
			</div>
			<div className="bg-w rounded-[0.8rem] mt-[0.9rem] ">
				<button
					type="button"
					onClick={() => {
						if (cancelFn) {
							cancelFn();
						}
					}}
					className="w-full h-[5.6rem] text-body3 text-g9"
				>
					취소
				</button>
			</div>
		</div>
	);
}

export default BoardModal;
