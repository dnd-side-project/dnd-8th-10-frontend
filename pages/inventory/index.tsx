import React from 'react';
import InventoryScreen from 'src/app.features/inventory/screens/InventoryScreen';
import useInventoryHistory from 'src/app.modules/hooks/inventory/useInventoryHistory';

// TODO: 인벤토리 폴더 구조 변경 필요. 겹치는 코드 많음
function Inventory() {
	const { data } = useInventoryHistory();
	return <InventoryScreen inventoryHistory={data} />;
}

export default Inventory;
