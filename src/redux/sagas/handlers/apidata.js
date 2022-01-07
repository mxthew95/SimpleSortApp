import { call, put } from "redux-saga/effects";
import { setApiData } from "../../reducers/apiDataReducer";
import { requestGetApiData } from "../request/apidata";

export function* handleGetApiData(action) {
    try {
        const data = yield call(requestGetApiData);
        yield put(setApiData(data));
    } catch (error) {
        console.log(error);
    }
}
