import axios from "axios";
import configs from "./configs";
import { clear } from "idb-keyval";

const callAPI = async ({
  endpoint,
  method = "GET",
  data,
  params = null,
  withCredentials = true,
  ...rest
}) => {
  let url = `${configs.API_HOST}${endpoint}`;
  let config = {
    withCredentials: withCredentials,
    params: params,
    ...rest,
  };

  let promiseObj = null;
  switch (method) {
    case "GET":
      promiseObj = axios.get(url, config);
      break;

    case "POST":
      promiseObj = axios.post(url, data, config);
      break;

    case "PUT":
      promiseObj = axios.put(url, data, config);
      break;

    case "DELETE":
      promiseObj = axios.delete(url, config);
      break;
  }

  let response_obj = null;
  await promiseObj
    .then((data) => {
      response_obj = data;
    })
    .catch((error) => {
      response_obj = error.response;
    });
  if (response_obj.status == 401) {
    clear()
      .then(() => {
        window.location = "/login";
      })
      .catch(() => {
        window.localStorage.clear();
        window.location = "/login";
      });
  }

  return response_obj;
};

export default callAPI;
