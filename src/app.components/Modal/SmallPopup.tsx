import React, { useEffect, useState } from 'react';

interface Props {
	message: string;
}
function SmallPopup({ message }: Props) {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{visible && (
				<div className="bg-transparent-80% z-[103]  text-subhead2 grid place-content-center text-w  w-[28rem] h-[5.3rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100%] rounded-[0.4rem]">
					<span>{message}</span>
				</div>
			)}
		</>
	);
}

export default SmallPopup;
