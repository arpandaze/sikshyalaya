import axios from "axios";
import configs from "./configs";
import { del } from "idb-keyval";

const getReq = async (endpoint, data, params = null) => {
  let response = null;
  await axios
    .get(`${configs.API_HOST}${endpoint}`, {
      withCredentials: true,
      params: params,
    })
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      return (response = error.response);
    });

  if (response.status === 401) {
    del("user")
      .then(() => {
        window.location = "/login";
      })
      .catch();
  }

  return response;
};

const postReq = async (endpoint, data, params = null) => {
  let response = null;
  await axios
    .post(`${configs.API_HOST}${endpoint}`, data, {
      withCredentials: true,
      params: params,
    })
    .then((res) => {
      response = res;
    })
    .catch((error) => {
      return (response = error.response);
    });

  if (response.status === 401) {
    del("user")
      .then(() => {
        window.location = "/login";
      })
      .catch();
  }

  return response;
};

const putReq = async (endpoint, data, params = null) => {
    let response = null;
    await axios
        .put(`${configs.API_HOST}${endpoint}`, data, {
            withCredentials: true,
            params: params,
        })
        .then((res) => {
            response = res;
            console.log(res);
        })
        .catch((error) => {
            return (response = error.response);
        });

    if (response.status === 401) {
        del("user")
            .then(() => {
                window.location = "/login";
            })
            .catch();
    }

    return response;
};

export { getReq, postReq , putReq};
