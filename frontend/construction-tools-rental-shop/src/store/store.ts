import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {

    }
})

export type appDispatch = typeof store.dispatch