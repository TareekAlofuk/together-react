import {applyMiddleware, combineReducers, createStore} from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import logger from "redux-logger";
import FetchArrayReducer from "reduxpp/dist/reducers/FetchArrayReducer";
import ReduxActions from "./ReduxActions";
import {wrapReducer} from "reduxpp/dist/utils/Utils";
import {reducer as toastrReducer} from 'react-redux-toastr'
import FetchObjectReducer from "reduxpp/dist/reducers/FetchObjectReducer";

const reducers: any = {
    RecentMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_RECENT_MEMBERS)),
    DisabledMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_DISABLED_MEMBERS)),
    ExpiredMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_EXPIRED_MEMBERS)),
    WillExpireMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_NEARLY_EXPIRED_MEMBERS)),
    WillExpirePassport: wrapReducer(new FetchArrayReducer(ReduxActions.GET_PASSPORT_NEARLY_EXPIRED)),
    MemberWithBirthDate: wrapReducer(new FetchArrayReducer(ReduxActions.GET_MEMBER_WITH_BIRTH_DATE)),
    ArchivedMembers: wrapReducer(new FetchArrayReducer(ReduxActions.GET_ARCHIVED_MEMBERS)),
    MemberSearchResult: wrapReducer(new FetchArrayReducer(ReduxActions.SEARCH_FOR_MEMBER)),
    MemberDetail: wrapReducer(new FetchObjectReducer(ReduxActions.FETCH_MEMBER_DETAIL)),
    MemberAttachments: wrapReducer(new FetchArrayReducer(ReduxActions.GET_MEMBER_ATTACHMENTS)),
    ServicesDetails : wrapReducer(new FetchArrayReducer(ReduxActions.GET_SERVICES_DETAILS)),
    ServicesUsage : wrapReducer(new FetchArrayReducer(ReduxActions.GET_SERVICES_USAGE)),

    toastr: toastrReducer,
};
console.log(reducers);
const middleware = applyMiddleware(logger, reduxPromiseMiddleware);

const store = createStore(combineReducers(reducers), middleware);


export default store;
