import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "./features/pagehome/pages/HomePage";
import { NotFoundPage } from "./features/pagenotfound/pages/NotFoundPage";
import { ContactPage } from "./features/pagecontact/pages/ContactPage";
import { HistoryPage } from "./features/pagehistory/pages/HistoryPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>,
        errorElement: <NotFoundPage/>,
    },
    {
        path: '/home',
        element: <HomePage/>
    },
    {
        path: '/history',
        element: <HistoryPage/>
    },
    {
        path: '/contact',
        element: <ContactPage/>
    },
])