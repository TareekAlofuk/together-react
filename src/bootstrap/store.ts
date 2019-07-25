import {applyMiddleware, combineReducers, createStore} from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import logger from "redux-logger";
import FetchArrayReducer from "reduxpp/dist/reducers/FetchArrayReducer";
import ReduxActions from "./ReduxActions";
import {wrapReducer} from "reduxpp/dist/utils/Utils";
import {reducer as toastrReducer} from 'react-redux-toastr'

const reducers: any = {
    RecentMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_RECENT_MEMBERS)),
    DisabledMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_DISABLED_MEMBERS)),
    ExpiredMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_EXPIRED_MEMBERS)),
    WillExpireMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_NEARLY_EXPIRED_MEMBERS)),
    WillExpirePassport: wrapReducer(new FetchArrayReducer(ReduxActions.GET_NEARLY_EXPIRED_MEMBERS)),
    MemberWithBirthDate: wrapReducer(new FetchArrayReducer(ReduxActions.GET_MEMBER_WITH_BIRTH_DATE)),
    ArchivedMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_ARCHIVED_MEMBERS)),
    MemberSearchResult: wrapReducer(new FetchArrayReducer(ReduxActions.SEARCH_FOR_MEMBER)),
    toastr: toastrReducer,
};
console.log(reducers);
const middleware = applyMiddleware(logger, reduxPromiseMiddleware);

const store = createStore(combineReducers(reducers), middleware);


export default store;