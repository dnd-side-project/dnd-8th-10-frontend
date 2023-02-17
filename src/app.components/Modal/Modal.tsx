import useModalStore from 'src/app.modules/store/modal';

interface Props {
	content: string;
	cancel?: boolean;
	deleteFn: () => void;
	cancelFn?: () => void;
}

function Modal({ content, cancel = false, deleteFn, cancelFn }: Props) {
	const { modalIsClose } = useModalStore();

	return (
		<div className="text-g9 z-50 w-[25rem] text-center rounded-[0.8rem] bg-w absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
			<div>
				<div className="flex items-center justify-center border-solid border-b-[0.15rem] border-b-g3">
					<div className={`p-[2.4rem] ${cancel ? 'w-[18rem]' : 'w-[20.4rem]'}`}>
						<span className="text-subhead3">{content}</span>
					</div>
				</div>

				<div className="flex items-center justify-center">
					<button
						type="button"
						onClick={() => {
							modalIsClose();
							deleteFn();
						}}
						className={`text-[1.4rem] h-[5.6rem] px-[1rem] py-[0.9rem] w-full ${cancel && 'text-secondary'}`}
					>
						{cancel ? '나가기' : '삭제'}
					</button>
					{cancel && (
						<button
							type="button"
							onClick={() => {
								if (cancelFn) {
									cancelFn();
								} else {
									modalIsClose();
								}
							}}
							className="text-[1.4rem] h-[5.6rem] w-full border-solid border-l-[0.15rem] border-b-g3"
						>
							취소
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Modal;
