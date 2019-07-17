import {applyMiddleware, combineReducers, createStore} from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import logger from "redux-logger";
import FetchArrayReducer from "reduxpp/dist/reducers/FetchArrayReducer";
import ReduxActions from "./ReduxActions";
import {wrapReducer} from "reduxpp/dist/utils/Utils";

const reducers: any = {
    RecentMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_RECENT_MEMBERS)),
    MemberSearchResult: wrapReducer(new FetchArrayReducer(ReduxActions.SEARCH_FOR_MEMBER))
};
console.log(reducers);
const middleware = applyMiddleware(logger, reduxPromiseMiddleware);

const store = createStore(combineReducers(reducers), middleware);


export default store;