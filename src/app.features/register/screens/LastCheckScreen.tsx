import React from 'react';
import Badge from 'src/app.components/app.base/Button/Badge';
import Header from 'src/app.components/Header';
import { MutateTpye } from 'src/app.modules/api/client';
import { MutateUserBody } from 'src/app.modules/api/user';
import { getUserWorkTimeString } from 'src/app.modules/util/getWorkTimeString';
import EditIcon from 'src/app.modules/assets/edit.svg';
import Bar from 'src/app.components/app.base/Button/Bar';
import useRegisterUserStore from '../store';

interface Props {
	postUserMutate: MutateTpye<MutateUserBody>;
	isLoading: boolean;
}
// TODO: 시급형식 맞춰주기 (,추가)
function LastCheckScreen({ postUserMutate, isLoading }: Props) {
	const {
		user: { phoneNumber, role, workPlace, workTime, workLocation, wage },
		setWage,
	} = useRegisterUserStore();
	const submitHandler = () => {
		console.log('제출');
		if (isLoading) return;
		const workTimeString = getUserWorkTimeString(workTime);
		if (!role || !phoneNumber || !workPlace || !workTimeString.trim() || !workLocation || !wage) {
			alert('필수 정보를 모두 입력해주세요.');
			return;
		}
		// TODO: 요일 입력 받기
		const body = {
			role,
			workPlace,
			workTime: workTimeString,
			workLocation,
			phoneNumber,
			wage, // TODO:급여필드 만들기
		};
		console.log(body);
		// postUserMutate(body);
	};
	return (
		<>
			<Header title="" />
			<main className="h-[100vh] pt-[10rem] space-y-[1.6rem] relative">
				<h1 className="text-g10 text-title2">마지막으로 확인해주세요! 🧐</h1>
				<ul className="space-y-[3rem]">
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">지점명</span>
						<Badge size="small" color="warmGray">
							<div className="flex items-center space-x-[0.4rem]">
								<span>{workPlace}</span>
								<EditIcon className="mt-[0.12rem]" />
							</div>
						</Badge>
					</li>
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">근무 일시</span>
						{getUserWorkTimeString(workTime)
							.split(',')
							.map((time, idx) => (
								<li key={`time-${idx}`}>
									<button>
										<Badge size="small" color="warmGray">
											<div className="flex items-center space-x-[0.4rem]">
												<span>{time}</span> <EditIcon className="mt-[0.12rem]" />
											</div>
										</Badge>
									</button>
								</li>
							))}
					</li>
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">전화번호</span>

						<Badge size="small" color="warmGray">
							<div className="flex items-center space-x-[0.4rem]">
								<span>{phoneNumber}</span>
								<EditIcon className="mt-[0.12rem]" />
							</div>
						</Badge>
					</li>
					<li className="flex flex-col space-y-[0.4rem]">
						<span className="text-g6 text-subhead2">시급</span>
						<Badge size="small" color="warmGray">
							<div className="flex items-center space-x-[0.4rem]">
								<span>{wage}원</span>
								<EditIcon className="mt-[0.12rem]" />
							</div>
						</Badge>
					</li>
				</ul>
				<div className="absolute bottom-[2rem] w-full">
					<Bar>확인</Bar>
				</div>
			</main>
		</>
	);
}

export default LastCheckScreen;
