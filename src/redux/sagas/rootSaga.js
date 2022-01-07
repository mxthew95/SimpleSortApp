import { takeLatest } from "redux-saga/effects";
import { GET_API_DATA } from "../reducers/apiDataReducer";
import { handleGetApiData } from "./handlers/apidata";


export function* watcherSaga() {
  yield takeLatest(GET_API_DATA, handleGetApiData);
}
