import { useEffect, useState } from "react"

export const useSessionStorage = <T>(key: string, defaultValue: T) => {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = sessionStorage.getItem(key);
            return stored ? JSON.parse(stored) as T : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch {
            
        }
    }, [value]);

    return [value, setValue] as const;
}