import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import cartReducer from '../Shop/superSlice';
import accessReducer from '../Access/accessSlice';
import adminReducer from '../Inventory/adminSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    access: accessReducer,
    admin: adminReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
