import "./ModalContainer.scss";
import React from "react";
import {connect} from "react-redux";
import Modal from "./Modal";
import {getModals} from "../redux/selectors";
import {moveModal} from "../redux/actions";


class ModalContainer extends React.Component {

    handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("modalId");
        const offsetX = e.dataTransfer.getData("offsetX");
        const offsetY = e.dataTransfer.getData("offsetY");
        this.props.moveModal(id, e.clientX - offsetX, e.clientY - offsetY);
    };

    handleDragOver = (e) => {
        e.preventDefault();
    };

    render() {
        const {modals, children} = this.props;
        return (
            <div
                className="modal-container"
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}>
                {modals && modals.length ?
                    modals.map((modal) =>
                        <Modal key={modal.id} {...modal} />
                    ) : null
                }
                {children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        modals: getModals(state)
    };
};

export default connect(mapStateToProps, {
    moveModal
})(ModalContainer);
