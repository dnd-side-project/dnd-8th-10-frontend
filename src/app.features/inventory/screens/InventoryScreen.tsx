import Link from 'next/link';
import React from 'react';
import Header from 'src/app.components/Header';
import { SERVICE_URL } from 'src/app.modules/constants/ServiceUrl';

function InventoryScreen() {
	return (
		<>
			<Header title="시재점검" />

			<main>
				<div>
					<ul>
						<li>
							<Link href={SERVICE_URL.inventoryCigarette}>담배</Link>
						</li>
						<li>
							<Link href={SERVICE_URL.inventoryBag}>쓰레기 봉투</Link>
						</li>
						<li>
							<Link href={SERVICE_URL.inventoryCard}>문화 상품권</Link>
						</li>
					</ul>
				</div>
			</main>
		</>
	);
}

export default InventoryScreen;
