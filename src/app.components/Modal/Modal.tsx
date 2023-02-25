import useModalStore from 'src/app.modules/store/modal';
import WarningIcon from 'src/app.modules/assets/modal/warning.svg';

interface Props {
	title: string;
	subTitle?: string;
	yesFn: () => void;
	noBtn?: boolean;
	yesTitle: string;
	noTitle?: string;
}

function Modal({ title, subTitle, yesFn, noBtn = false, yesTitle, noTitle }: Props) {
	const { modalIsClose } = useModalStore();

	return (
		<div className="text-g9 z-50 w-[25rem] text-center rounded-[0.8rem] bg-w absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
			<div>
				<div className="flex items-center justify-center border-solid border-b-[0.15rem] border-b-g3">
					<div className="px-[2.3rem] py-[2.4rem]">
						{noBtn && (
							<div className="flex justify-center mb-[0.8rem] mt-[0.85rem]">
								<WarningIcon />
							</div>
						)}
						<span className="text-subhead3">{title}</span>
						{subTitle && (
							<>
								<br /> <span className="text-subhead-long2">{subTitle}</span>
							</>
						)}
					</div>
				</div>

				<div className="flex items-center justify-center">
					<button
						type="button"
						onClick={() => {
							yesFn();
							modalIsClose();
						}}
						className={`text-[1.4rem] h-[5.6rem] px-[1rem] py-[0.9rem] w-full ${noBtn && 'text-secondary'} ${
							yesTitle === '탈퇴하기' && 'text-secondary'
						}`}
					>
						{yesTitle}
					</button>
					{noBtn && (
						<button
							type="button"
							onClick={() => modalIsClose()}
							className="text-[1.4rem] h-[5.6rem] w-full border-solid border-l-[0.15rem] border-b-g3"
						>
							{noTitle}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Modal;
