import { useSelector } from "react-redux";
import type { StoreType } from "../redux/store";
import { cssVar } from "../utils/cssVar";
import { useEffect, useState } from "react";

export const useCardGradient = (fromGradient: string = '--card', toGradient: string = '--background2') => {
    const theme = useSelector((state: StoreType) => state.theme.value);

    const [gradient, setGradient] = useState<string>('');

    useEffect(() => {
        const angle = Math.floor(Math.random() * 360);
        const gradient = `linear-gradient(${angle}deg, ${cssVar(fromGradient)}, ${cssVar(toGradient)})`; 
        setGradient(gradient);
    }, [theme]);

    return gradient;
}