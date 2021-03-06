import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import apiDataReducer from "./reducers/apiDataReducer";
import { watcherSaga } from "./sagas/rootSaga";

const reducer = combineReducers({
    apiData: apiDataReducer
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;