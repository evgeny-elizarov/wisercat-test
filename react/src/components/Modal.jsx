import "./Modal.scss";
import React from "react";
import cx from "classnames";
import {connect} from "react-redux";
import {
    closeModal,
    resizeModal,
    toggleResizeModal,
    toggleDraggableModal,
    moveModal,
    setActiveModal,
} from "../redux/actions";
import utils from "../utils";


class Modal extends React.Component {

    constructor(props){
        super(props);
        this.windowRef = React.createRef();
        this.resize = null;
    }

    componentDidMount = () => {
        const rect = this.windowRef.current.getBoundingClientRect();
        const sw = window.innerWidth;
        const sh = window.innerHeight;
        const nextPosOffset = 10;
        const x = (((sw - rect.width) / 2) + this.props.id * nextPosOffset) % (sw - rect.width);
        const y = (((sh - rect.height) / 2) + this.props.id * nextPosOffset) % (sh - rect.height);
        this.props.resizeModal(this.props.id, x, y, rect.width, rect.height);
    };

    handleHeaderMouseDown = (e) => {
        if(!this.props.draggable){
            utils.disableSelection();
            this.props.setActiveModal(this.props.id);
            this.props.toggleDraggableModal(this.props.id);
        }
    };

    handleHeaderMouseUp = (e) => {
        if(this.props.draggable){
            utils.enableSelection();
            this.props.toggleDraggableModal(this.props.id);
        }
    };

    handleDragStart = (e) => {
        utils.clearSelection();
        const rect = this.windowRef.current.getBoundingClientRect();
        e.dataTransfer.setData("modalId", this.props.id);
        e.dataTransfer.setData("offsetX", e.clientX - rect.left);
        e.dataTransfer.setData("offsetY", e.clientY - rect.top);
    };

    handleDragStop = (e) => {
        utils.enableSelection();
        this.props.toggleDraggableModal(this.props.id);
    };

    doResizeDrag = (e) => {
        if(this.resize){
            const min_height = 105;
            const rect = this.windowRef.current.getBoundingClientRect();
            const w = (this.resize.startWidth - this.resize.startX);
            let h = (this.resize.startHeight + e.clientY - this.resize.startY);
            h = (h <= min_height) ? this.resize.startHeight - this.resize.startY : h;
            this.props.resizeModal(this.props.id, rect.left, rect.top, w, h);
        }
    };

    stopResizeDrag = (e) => {
        this.resize = null;
        document.documentElement.removeEventListener('mousemove', this.doResizeDrag, false);
        document.documentElement.removeEventListener('mouseup', this.stopResizeDrag, false);
        utils.enableSelection();
    };

    handleResizeControlMouseDown = (e) => {
        const rect = this.windowRef.current.getBoundingClientRect();
        this.resize = {
            startX: e.clientX,
            startY: e.clientY,
            startWidth: rect.width,
            startHeight: rect.height
        };
        document.documentElement.addEventListener('mousemove', this.doResizeDrag, false);
        document.documentElement.addEventListener('mouseup', this.stopResizeDrag, false);
        this.props.setActiveModal(this.props.id);
        utils.clearSelection();
        utils.disableSelection();
    };

    render() {
        const {
            id, x, y, w, h, zIndex,
            title, content,
            isDrag, isActive,
            closeModal,
            setActiveModal
        } = this.props;
        return (
            <div
                ref={this.windowRef}
                className={cx(
                    "modal-window",
                    isActive && "active",
                    isDrag && "drag"
                )}
                style={{
                    left: x || 'auto',
                    top: y || 'auto',
                    width: w || 'auto',
                    height: h || 'auto',
                    zIndex: zIndex
                }}
                onClick={() => setActiveModal(id)}
                draggable={isDrag}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragStop}
                >
                {/* Title */}
                <div
                    className="header"
                    onMouseDown={this.handleHeaderMouseDown}
                    onMouseUp={this.handleHeaderMouseUp}
                >
                    {title} ({id})
                    <div className="actions">
                        {/* Close button */}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => closeModal(id)}>X
                        </button>
                    </div>
                </div>
                {/* Content */}
                <div className="modal-content">{content}</div>
                <div className="footer">
                    <div
                        className="resize-control"
                        onMouseDown={this.handleResizeControlMouseDown}
                    />
                </div>
            </div>
        )
    }
}

export default connect(null, {
    closeModal,
    resizeModal,
    toggleResizeModal,
    toggleDraggableModal,
    moveModal,
    setActiveModal
})(Modal);
