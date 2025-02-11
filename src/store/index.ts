import { configureStore } from '@reduxjs/toolkit';
import { inventorySlice } from './features/inventory';

export const store = configureStore({
	reducer: {
		[inventorySlice.name]: inventorySlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
