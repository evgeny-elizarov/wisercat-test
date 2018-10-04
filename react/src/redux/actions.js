import {
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_ACTIVE_MODAL,
    RESIZE_MODAL,
    TOGGLE_RESIZE_MODAL,
    TOGGLE_DRAGGABLE_MODAL,
    MOVE_MODAL,
    CLOSE_ALL_MODALS
} from "./actionTypes";

let nextModalId = 0;

export const openModal = (title, content, w, h) => {
    return {
        type: OPEN_MODAL,
        payload: {
            id: ++nextModalId,
            title,
            content,
            w, h
        }
    }
};

export const closeModal = id => ({
    type: CLOSE_MODAL,
    payload: { id }
});

export const resizeModal = (id, x, y, w, h) => ({
    type: RESIZE_MODAL,
    payload: { id, x, y, w, h }
});

export const toggleResizeModal = (id) => ({
    type: TOGGLE_RESIZE_MODAL,
    payload: { id }
});

export const moveModal = (id, x, y) => ({
    type: MOVE_MODAL,
    payload: { id, x, y }
});

export const toggleDraggableModal = (id) => ({
    type: TOGGLE_DRAGGABLE_MODAL,
    payload: { id }
});

export const setActiveModal = id => ({
    type: SET_ACTIVE_MODAL,
    payload: { id }
});

export const closeAllModals = () => ({
    type: CLOSE_ALL_MODALS,
});