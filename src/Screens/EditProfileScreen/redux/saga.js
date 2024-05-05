import { call, put, takeLatest, all } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UPDATE_PROFILE, GET_PROFILE, UPDATE_PROFILE_STATUS } from "./types";
import {
  updateProfileSuccess,
  updateProfileFailure,
  getProfileSuccess,
  getProfileFailure,
  updateProfileStatusSuccess,
  updateProfileStatusFailure,
} from "./actions";
import { Toast } from "react-native-toast-notifications";
import {BASE_URL} from '../../../Config/app';
import XHR from '../../../Utils/XHR';

async function getProfileApi(data) {
  const URL = `${BASE_URL}/api/v1/profile/${data.id}/`;
  const accessToken = await AsyncStorage.getItem("accessToken");
  const option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${accessToken}`,
    },
    method: "GET",
  };
  return XHR(URL, option);
}

async function updateProfileApi(data) {
  const URL = `${BASE_URL}/api/v1/profile/${data._parts[0][1]}/`;
  const accessToken = await AsyncStorage.getItem("accessToken");
  const option = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${accessToken}`,
    },
    method: "PATCH",
    data,
  };
  return XHR(URL, option);
}

async function updateProfileStatusApi(data) {
  const URL = `${BASE_URL}/api/v1/profile/${data.id}/`;
  const accessToken = await AsyncStorage.getItem("accessToken");
  const option = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${accessToken}`,
    },
    method: "PATCH",
    data,
  };
  return XHR(URL, option);
}

function* getProfileApiCall({ data }) {
  try {
    const response = yield call(getProfileApi, data);

    yield put(getProfileSuccess(response.data));
  } catch (e) {
    const { response } = e;
    yield put(getProfileFailure(response));
  }
}

function* updateProfileApiCall({ data, callBack }) {
  try {
    const response = yield call(updateProfileApi, data);

    yield put(updateProfileSuccess(response.data));
    Toast.show("Profile updated successfully");
    callBack();
  } catch (e) {
    const { response } = e;
    yield put(updateProfileFailure(response));
  }
}

function* updateProfileStatusApiCall({ data }) {
  try {
    const response = yield call(updateProfileStatusApi, data);

    yield put(updateProfileStatusSuccess(response.data));
  } catch (e) {
    const { response } = e;
    yield put(updateProfileStatusFailure(response));
  }
}

export default all([
  takeLatest(GET_PROFILE, getProfileApiCall),
  takeLatest(UPDATE_PROFILE, updateProfileApiCall),
  takeLatest(UPDATE_PROFILE_STATUS, updateProfileStatusApiCall),
]);
