import axios from "axios";
import { useEffect, useState } from "react";
import configs from "./configs";
import { del } from "idb-keyval";

export const useAPI = ({ endpoint, method = "GET", queryParams, data }, formatter) => {
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

            case "GET":
                promiseObj = axios.get(url, config);
        }

        promiseObj
            .then((res) => {
                let formattedRes = res;
                if (formattedRes.status === 401) {
                    del("user")
                        .then(() => {
                            window.location = "/login";
                        })
                        .catch();
                }
                if (formatter) {
                    formattedRes = formatter(res);
                }
                setResponseState({ response: formattedRes, complete: true });
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }, [endpoint, method, queryParams, data, setResponseState]);

    return Object.values(responseState);
};