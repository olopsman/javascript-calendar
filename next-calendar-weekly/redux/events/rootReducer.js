import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import eventsSlice from "./eventsSlice";

export const rootReducer = combineReducers({
    eventsData: eventsSlice,
});

const configStore = {
    key: "root",
    storage,
    whitelist: ["events"],
}

export default persistReducer(configStore, rootReducer);