import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "../reducers/toolReducer.ts";
import OrderReducer from "../reducers/orderReducer.ts";


export const store = configureStore({
    reducer: {
        tool: toolReducer,
        order: OrderReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
