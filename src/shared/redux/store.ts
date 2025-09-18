import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { themeSlice } from './slices/theme';
import { loadedSlice } from './slices/loaded';
import localStorage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import { selectedFigureSlice } from './slices/selectedFigure';

// local storage slices
const themeConfig = {
    key: 'theme',
    storage: localStorage
}

// session storage slices
const loadedConfig = {
    key: 'loading',
    storage: sessionStorage
}

const selectedFigureConfig = {
    key: 'selectedFigure',
    storage: sessionStorage
}

// persisted reducers
const persistedThemeReducer = persistReducer(themeConfig, themeSlice.reducer);
const persistedLoadedReducer = persistReducer(loadedConfig, loadedSlice.reducer);
const persistedSelectedFigureReducer = persistReducer(selectedFigureConfig, selectedFigureSlice.reducer);

// store
export const store = configureStore({
    reducer: {
        theme: persistedThemeReducer,
        loaded: persistedLoadedReducer,
        selectedFigure: persistedSelectedFigureReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

// persistor
export const persistor = persistStore(store);

// types
export type StoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;