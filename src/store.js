

import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/UserReducer";

export const store = configureStore({
    reducer:{
        users: UserReducer
    }
})