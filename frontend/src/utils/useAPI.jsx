import axios from "axios";
import {useEffect, useState} from "react";
import configs from "./configs";
import {clear} from "idb-keyval";

const useAPI = (
  {endpoint, method = "GET", params, data, withCredentials = true},
  formatter,
  defaults = null
) => {
  const [responseState, setResponseState] = useState({
    response: defaults,
    complete: false,
  });
  useEffect(() => {
    let url = `${configs.API_HOST}${endpoint}`;
    let config = {
      withCredentials: withCredentials,
      params: params,
    };

    let promiseObj = null;

    switch (method) {
      case "POST":
        promiseObj = axios.post(url, data, config);
        break;

      case "GET":
        promiseObj = axios.get(url, config);
        break;
    }

    promiseObj
      .then((res) => {
        let formattedRes = res;

        if (formatter) {
          formattedRes = formatter(res);
        }
        setResponseState({response: formattedRes, complete: true});
      })
      .catch((error) => {
        if (error.response == null) {
          throw error;
        }
        if (error.response.status === 401) {
          clear()
            .then(() => {
              window.location = "/login";
            })
            .catch(() => {
              window.localStorage.clear();
            });
          setResponseState({response: error.response, complete: true});
        }
      });
  }, [endpoint, method, params, data, setResponseState]);

  return Object.values(responseState);
};

export default useAPI;
