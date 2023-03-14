import React, { useEffect, useState } from 'react';
import TextInput from 'src/app.components/app.base/Input/TextInput';
import InputInteractButton from 'src/app.components/Button/InputInteractButton';

interface Props {
	closeModal: () => void;
	onDone: () => void;
	newCiga: string;
	onNewCigaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onReset: () => void;
}
// TODO: 모달 대통합 이루기
function NewCigaSaveModal({ closeModal, onDone, newCiga, onNewCigaChange, onReset }: Props) {
	const [isPop, setIsPop] = useState<boolean>();
	useEffect(() => {
		setIsPop(true);
	}, []);
	return (
		<div>
			<div
				role="presentation"
				onClick={() => {
					setIsPop(false);
					closeModal();
				}}
				className={`translate-x-0 z-[101] fixed max-w-[50rem] mx-auto top-0 left-0 bottom-0 right-0 bg-transparent-30% backdrop-filter backdrop-blur-[0.4rem]'
			
					transition-all duration-500 ease-in-out ${isPop ? 'opacity-100' : 'opacity-0'}
				`}
			/>
			<div
				aria-modal
				className={`bg-w rounded-t-[1.6rem] z-[102] fixed bottom-0 max-w-[50rem] -translate-x-[2rem] mx-auto w-full transition-transform duration-500 ease-in-out ${
					isPop ? 'transform translate-y-0' : 'transform translate-y-full'
				}`}
			>
				<div className="flex justify-center mt-[0.8rem] mb-[2.4rem]">
					<div className="w-[5rem] h-[0.4rem] bg-g4 rounded-[1rem]" />
				</div>
				<div className="px-[2rem] pb-[2rem]">
					<div className="flex flex-col space-y-[1.2rem]">
						<h2 className="text-g10 text-subhead3">항목추가</h2>
						<TextInput
							id="newCigarette"
							name="newCigarette"
							value={newCiga}
							onChange={onNewCigaChange}
							resetHandler={onReset}
							mode="default"
							placeholder="내용입력"
							submitHandler={onDone}
						/>
						<div aria-hidden className="h-[6rem]" />
						<InputInteractButton type="button" onClick={onDone} disabled={!newCiga.trim()} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewCigaSaveModal;
