import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./redux/store";
import Home from './components/Screen';





const renderApplication = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Home/>
        </Provider>,
        document.querySelector('#root')
    )
};

renderApplication();
