let exports = {};

exports.disableSelection = () => {
    document.body.classList.add("no-selection");

};

exports.enableSelection = () => {
    document.body.classList.remove("no-selection");
};

exports.clearSelection = () => {

    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        let sel = window.getSelection();
        sel.removeAllRanges();
    }
};

export default exports;
