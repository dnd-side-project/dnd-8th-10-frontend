import { useRouter } from 'next/router';
import HomeIcon from 'src/app.modules/assets/home/home.svg';
import CalendarIcon from 'src/app.modules/assets/home/calendar.svg';
import BoardIcon from 'src/app.modules/assets/home/board.svg';
import MyIcon from 'src/app.modules/assets/home/my.svg';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

function Navigation() {
	const router = useRouter();
	return (
		<footer className="bg-w flex items-center h-[5.6rem] fixed bottom-0 max-w-[42rem] -translate-x-[2rem] mx-auto w-full border-solid border-t-[0.05rem] border-g3">
			<nav className="flex w-full">
				<ul className="flex justify-between mx-[3rem] w-full">
					<li
						role="presentation"
						className="flex flex-col items-center"
						onClick={() => router.push(`${SERVICE_URL.home}`)}
					>
						<HomeIcon stroke={`${router.pathname === `${SERVICE_URL.home}` ? '#66666E' : '#E8E8EB'}`} />
						<div className={`${router.pathname === `${SERVICE_URL.home}` ? 'text-[#66666E]' : 'text-[#E8E8EB]'}`}>
							홈
						</div>
					</li>
					<li
						role="presentation"
						className="flex flex-col items-center"
						onClick={() => router.push(`${SERVICE_URL.calendar}`)}
					>
						<CalendarIcon fill={`${router.pathname === `${SERVICE_URL.calendar}` ? '#66666E' : '#E8E8EB'}`} />
						<div className={`${router.pathname === `${SERVICE_URL.calendar}` ? 'text-[#66666E]' : 'text-[#E8E8EB]'}`}>
							캘린더
						</div>
					</li>
					<li
						role="presentation"
						className="flex flex-col items-center"
						onClick={() => router.push(`${SERVICE_URL.board}`)}
					>
						<BoardIcon stroke={`${router.pathname === `${SERVICE_URL.board}` ? '#66666E' : '#E8E8EB'}`} />
						<div className={`${router.pathname === `${SERVICE_URL.board}` ? 'text-[#66666E]' : 'text-[#E8E8EB]'}`}>
							게시판
						</div>
					</li>
					<li
						role="presentation"
						className="flex flex-col items-center"
						onClick={() => router.push(`${SERVICE_URL.mypage}`)}
					>
						<MyIcon stroke={`${router.pathname === `${SERVICE_URL.mypage}` ? '#66666E' : '#E8E8EB'}`} />
						<div className={`${router.pathname === `${SERVICE_URL.mypage}` ? 'text-[#66666E]' : 'text-[#E8E8EB]'}`}>
							마이페이지
						</div>
					</li>
				</ul>
			</nav>
		</footer>
	);
}
export default Navigation;
