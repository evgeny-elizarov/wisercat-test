export const getModalList = store => store.modalList;

export const getModalById = (store, id) => ({ ...store.modalMap.modals[id], id });

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getModals = store => getModalList(store).map(id => getModalById(store, id));
