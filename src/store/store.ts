import { combineReducers, configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./reducers/QuestionsSlice";

const rootReducer = combineReducers({
    questionsReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']