import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface Inventory {
	id: string;
	name: string;
	qty: number;
	uom: 'kg' | 'liter' | 'pcs';
	priceQty: number;
	createdAt: number;
	updatedAt: number;
}

interface InventoryState {
	inventories: Inventory[];
	selectedInventory: Inventory | null;
}

const inventoryState: InventoryState = {
	inventories: [
		{
			id: crypto.randomUUID(),
			name: 'Aren Sugar',
			qty: 1,
			uom: 'kg',
			priceQty: 60000,
			createdAt: 1739244625727,
			updatedAt: 1739244625727,
		},
		{
			id: crypto.randomUUID(),
			name: 'Milk',
			qty: 1,
			uom: 'liter',
			priceQty: 30000,
			createdAt: 1739244625727,
			updatedAt: 1739244625727,
		},
		{
			id: crypto.randomUUID(),
			name: 'Ice Cube',
			qty: 1,
			uom: 'kg',
			priceQty: 15000,
			createdAt: 1739244625727,
			updatedAt: 1739244625727,
		},
		{
			id: crypto.randomUUID(),
			name: 'Plastic Cup',
			qty: 10,
			uom: 'pcs',
			priceQty: 5000,
			createdAt: 1739244625727,
			updatedAt: 1739244625727,
		},
		{
			id: crypto.randomUUID(),
			name: 'Coffee Bean',
			qty: 1,
			uom: 'kg',
			priceQty: 100000,
			createdAt: 1739244625727,
			updatedAt: 1739244625727,
		},
		{
			id: crypto.randomUUID(),
			name: 'Mineral Water',
			qty: 1,
			uom: 'liter',
			priceQty: 5000,
			createdAt: 1739244625727,
			updatedAt: 1739244625727,
		},
	],
	selectedInventory: null,
};

export const inventorySlice = createSlice({
	name: 'inventory',
	initialState: inventoryState,
	reducers: {
		setInventories(state: InventoryState, action: PayloadAction<Inventory[]>) {
			state.inventories = action.payload;
		},
		setSelectedInventory(
			state: InventoryState,
			action: PayloadAction<Inventory>
		) {
			state.selectedInventory = action.payload;
		},
	},
});

export const { setInventories } = inventorySlice.actions;
export const { setSelectedInventory } = inventorySlice.actions;

export const inventoriesData = (state: RootState) =>
	[...state.inventory.inventories].sort((a, b) => b.updatedAt - a.updatedAt);

export const selectedInventoryData = (state: RootState) =>
	state.inventory.selectedInventory;
