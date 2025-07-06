import { configureStore } from "@reduxjs/toolkit";

import { api } from "@/shared/redux/api/base";
import { rtkQueryErrorLogger } from "./middlewares/errorInterceptor";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).concat(rtkQueryErrorLogger),
});


