import React from "react";
import ReactDom from "react-dom";
import App from "./bootstrap/App";
import Axios from "axios";
import SessionManager from "./shared/utils/SessionManager";


Axios.interceptors.request.use(function (config) {
    const token = SessionManager.getToken();
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error && error.response && error.response.status === 401) {
        SessionManager.logout();
    }
    return Promise.reject(error);
});


ReactDom.render(<App/>, document.getElementById("root"));