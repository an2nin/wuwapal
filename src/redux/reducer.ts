import { combineReducers } from "redux";

import { store } from "@/redux/store";

import authReducer from "@/redux/slices/auth";
import bannerReducer from "@/redux/slices/banner";

const rootReducer = combineReducers({ authReducer, bannerReducer });
export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;