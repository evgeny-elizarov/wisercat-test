import {
    OPEN_MODAL,
    RESIZE_MODAL,
    TOGGLE_RESIZE_MODAL,
    TOGGLE_DRAGGABLE_MODAL,
    MOVE_MODAL,
    CLOSE_MODAL,
    CLOSE_ALL_MODALS,
    SET_ACTIVE_MODAL
} from "../actionTypes";

const defaultState = {
    maxZIndex: 0,
    modals: []
};

/**
 * Reset active status for all modals
 * @param modals
 */
function resetActiveOnAllModals(modals) {
    for(let id in modals ) {
        if(modals.hasOwnProperty(id)){
            modals[id].isActive = false
        }
    }
}

const modalMap = (state = defaultState, action) => {
    switch (action.type) {

        case OPEN_MODAL: {
            const {id, title, content, w, h} = action.payload;
            const maxZIndex = ++state.maxZIndex;

            resetActiveOnAllModals(state.modals);

            return {
                ...state,
                maxZIndex: maxZIndex,
                modals: {
                    ...state.modals,
                    [id]: {
                        title,
                        content,
                        w: w,
                        h: h,
                        zIndex: maxZIndex,
                        isDrag: false,
                        isActive: true,
                        dragResizeControl: false,
                        moving: false
                    }
                }
            };
        }

        case RESIZE_MODAL: {
            const {id, x, y, w, h} = action.payload;
            const modal = state.modals[id];
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [id]: {
                        ...modal,
                        x: x,
                        y: y,
                        w: w,
                        h: h
                    }
                }
            };
        }

        case TOGGLE_RESIZE_MODAL: {
            const {id} = action.payload;
            const modal = state.modals[id];
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [id]: {
                        ...modal,
                        dragResizeControl: !modal.dragResizeControl
                    }
                }
            };
        }

        case TOGGLE_DRAGGABLE_MODAL: {
            const {id} = action.payload;
            const modal = state.modals[id];
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [id]: {
                        ...modal,
                        isDrag: !modal.isDrag
                    }
                }
            };
        }

        case MOVE_MODAL: {
            const {id, x, y} = action.payload;
            const modal = state.modals[id];
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [id]: {
                        ...modal,
                        x: x,
                        y: y
                    }
                }
            };
        }

        case SET_ACTIVE_MODAL: {
            const {id} = action.payload;
            const modal = state.modals[id];
            if (modal === undefined) {
                return state;
            }
            // Set max zIndex when focus on window
            let maxZIndex = state.maxZIndex;
            if (modal.zIndex < maxZIndex) {
                modal.zIndex = ++maxZIndex;
                maxZIndex = modal.zIndex;
            }

            resetActiveOnAllModals(state.modals);

            return {
                ...state,
                maxZIndex: maxZIndex,
                modals: {
                    ...state.modals,
                    [id]: {
                        ...modal,
                        isActive: true,
                        zIndex: modal.zIndex
                    }
                }
            };
        }

        case CLOSE_MODAL: {
            const {id} = action.payload;
            delete state.modals[id];
            let maxZIndex = 0;
            let topModalId = null;
            let topModal = null;
            for (let id in state.modals){
                if(state.modals[id].zIndex > maxZIndex){
                    maxZIndex = state.modals[id].zIndex;
                    topModalId = id;
                    topModal = state.modals[id];
                }
            }
            if(topModalId){
                state.modals[topModalId].isActive = true;
            }

            return {
                ...state
            };
        }

        case CLOSE_ALL_MODALS: {
            return defaultState;
        }

        default:
            return state;
    }
};

export default modalMap;