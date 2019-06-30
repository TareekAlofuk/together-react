import {createStore, combineReducers, applyMiddleware} from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import logger from "redux-logger";

const reducers = {
    Test : () => 'test reducer'
};
const middleware = applyMiddleware(logger , reduxPromiseMiddleware);

const store = createStore(combineReducers(reducers) , middleware);


export default store;