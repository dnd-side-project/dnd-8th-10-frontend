import React from 'react';
import { MutateTpye } from 'src/app.modules/api/client';
import { WriteBody, WriteImgBody } from '../api';
import BoardEditor from '../components/BoardEditor';
import { IBoardViewData } from '../types';

interface Props {
	id: string | string[] | undefined;
	UserData: {
		role: string;
	};
	boardViewData: IBoardViewData;
	BoardModifyMutate: MutateTpye<WriteBody>;
	BoardWriteImgMutate: MutateTpye<WriteImgBody>;
}

function BoardEditScreen({ id, UserData, boardViewData, BoardModifyMutate, BoardWriteImgMutate }: Props) {
	return (
		<BoardEditor
			id={id}
			UserData={UserData}
			boardViewData={boardViewData}
			BoardMutate={BoardModifyMutate}
			BoardWriteImgMutate={BoardWriteImgMutate}
		/>
	);
}
export default BoardEditScreen;
