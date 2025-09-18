import { useEffect, useState } from "react"

export const usePageReady = (delay: number = 1000) => {
    const [isReady, setReady] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), delay);
        return () => clearTimeout(timer);
    }, []);

    return isReady;
}