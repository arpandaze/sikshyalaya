import axios from "axios";
import { useEffect, useState } from "react";
import configs from "./configs";
import { clear } from "idb-keyval";

export const useAPI = (
    { endpoint, method = "GET", queryParams, data },
    formatter
) => {
    const [responseState, setResponseState] = useState({
        response: null,
        complete: false,
    });
    useEffect(() => {
        let url = `${configs.API_HOST}${endpoint}`;
        let config = {
            withCredentials: true,
            params: queryParams,
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
                setResponseState({ response: formattedRes, complete: true });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    clear()
                        .then(() => {
                            window.location = "/login";
                        })
                        .catch(() => {
                            window.localStorage.clear();
                        });
                }
            });
    }, [endpoint, method, queryParams, data, setResponseState]);

    return Object.values(responseState);
};
