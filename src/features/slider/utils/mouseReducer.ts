type MouseReducerState = {
    width: number; 

    initialX: number;
    differenceX: number; 
    translateX: number;
    isDragging: boolean;
}

type Event = React.MouseEvent | React.TouchEvent;

type MouseReducerAction =
    { type: 'down', e: Event } |
    { type: 'move', e: Event } |
    { type: 'up' } | 
    { type: 'setWidth', width: number };

export const mouseReducer = (state: MouseReducerState, action: MouseReducerAction): MouseReducerState => {
    switch(action.type) {
        case 'down':
            return { ...state, isDragging: true, initialX: "touches" in action.e ? action.e.touches[0].clientX : action.e.pageX};
        case 'move':
            if(!state.isDragging)
                return state;
            const current = "touches" in action.e ? action.e.touches[0].clientX : action.e.pageX;
            return { ...state, differenceX: state.initialX - current, translateX: state.differenceX / state.width * 100 };
        case 'up':
            return { ...state, isDragging: false, initialX: 0, differenceX: 0, translateX: 0 };
        case 'setWidth':
            return { ...state, width: action.width };
        default:
            return state;
    }
}
