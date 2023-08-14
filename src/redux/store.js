import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeReducer from './theme/themeReducer';
import {managmentReducer} from "./onlineManag/managmentReducer";

const rootReducer = combineReducers({
    theme: themeReducer,
    terminal: managmentReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);
export default store;








// import { createStore, combineReducers,  } from 'redux';
// import themeReducer from "./theme/themeReducer";
// import {managmentReducer} from "./onlineManag/managmentReducer";
//
//
// const rootReducer = combineReducers ({
//     theme: themeReducer,
//     terminal : managmentReducer,
// })
//
// const store = createStore(rootReducer);
//
// export default store;