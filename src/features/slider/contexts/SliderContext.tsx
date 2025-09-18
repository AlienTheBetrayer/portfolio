import React, { createContext, useContext } from "react";
import type { ElementsReducerAction, ElementsReducerState } from "../utils/elementsReducer";

type SliderContextType = [
    data: ElementsReducerState,
    setData: React.ActionDispatch<[action: ElementsReducerAction]>
]

export const SliderContext = createContext<SliderContextType | undefined>(undefined);

export const useSliderContext = () => {
    return useContext(SliderContext) as SliderContextType;
}