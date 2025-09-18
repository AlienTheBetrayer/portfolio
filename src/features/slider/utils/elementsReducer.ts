export type ElementsReducerState = { 
    elements: React.ReactNode[];
    current: number;
};

export type ElementsReducerAction = 
{ type: 'previous' } | { type: 'next' } | { type: 'jump', to: number };

export const elementsReducer = (state: ElementsReducerState, action: ElementsReducerAction): ElementsReducerState => {
    switch(action.type) {
        case 'next':
            return { 
                ...state,
                current: state.current == state.elements.length - 1 ? 0 : state.current + 1
            };
        case 'previous':
            return { 
                ...state,
                current: state.current == 0 ? state.elements.length - 1 : state.current - 1
            };
        case 'jump':
            return {
                ...state,
                current: action.to
            }
        default:
            return state;
    }
}

