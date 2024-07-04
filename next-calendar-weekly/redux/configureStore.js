import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
}
from "redux-persist";
import rootReducer from "./events/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./events/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: 
        process.env.NODE_ENV !== "production" 
        ? (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
        }).concat(logger)
        .concat(sagaMiddleware)
        : (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

const config = { store, persistor };
export default config;