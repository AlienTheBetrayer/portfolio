import { useSelector } from "react-redux"
import type { StoreType } from "./store"
import { useEffect } from "react";

export const Watcher = () => {
    const theme = useSelector((state: StoreType) => state.theme.value);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return null;
}