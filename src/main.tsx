import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import { router } from './router'
import { persistor, store } from './shared/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Watcher } from './shared/redux/Watcher';

createRoot(document.getElementById('root')!).render(
<StrictMode>
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <Watcher/>
            <RouterProvider router={router}/>
        </PersistGate>
    </Provider>
  </StrictMode>
)
