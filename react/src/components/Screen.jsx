import "./Screen.scss";
import React from 'react';
import {connect} from "react-redux";
import ModalContainer from "./ModalContainer";
import {openModal, closeAllModals} from "../redux/actions";
import FilterForm from "./FilterForm";

const Screen = ({openModal, closeAllModals}) => (
    <ModalContainer>
        <div className="content">
            <h1>Modal dialog example</h1>
            <div className="buttons">
                <button
                    type="button"
                    onClick={() => {
                        openModal("Filter", <FilterForm/>, 1097, 398);
                    }}>Open modal
                </button>
                <button
                    type="button"
                    onClick={() => {
                        closeAllModals();
                    }}>Close all
                </button>
            </div>
        </div>
    </ModalContainer>
);

export default connect(null, {openModal, closeAllModals})(Screen);
