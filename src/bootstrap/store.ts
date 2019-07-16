import {createStore, combineReducers, applyMiddleware} from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import logger from "redux-logger";
import FetchArrayReducer from "reduxpp/dist/reducers/FetchArrayReducer";
import ReduxActions from "./redux-actions";

const reducers: any = {
    Test: () => 'test reducer',
    MemberSearchResult: new FetchArrayReducer(ReduxActions.MEMBER_SEARCH)
};
const middleware = applyMiddleware(logger, reduxPromiseMiddleware);

const store = createStore(combineReducers(reducers), middleware);


export default store;