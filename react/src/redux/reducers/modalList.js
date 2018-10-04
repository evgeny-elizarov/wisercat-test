import {
    CLOSE_MODAL,
    OPEN_MODAL,
    CLOSE_ALL_MODALS
} from "../actionTypes";

const defaultState = [];
const modalList = (state = defaultState, action) => {
    switch (action.type) {

        case OPEN_MODAL: {
            const { id } = action.payload;
            return [...state, id];
        }

        case CLOSE_MODAL: {
            const { id } = action.payload;
            const index = state.indexOf(id);
            if (index > -1) {
                state.splice(index, 1);
            }
            return [...state ];
        }

        case CLOSE_ALL_MODALS: {
            return [];
        }

        default:
            return state;
    }
};

export default modalList;
