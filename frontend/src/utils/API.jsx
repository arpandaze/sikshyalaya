import axios from "axios";
import configs from "./configs";

const getReq = async (endpoint) => {
    let response = null;
    try {
        response = await axios.get(`${configs.API_HOST}${endpoint}`, {
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
    return response;
};

const postReq = async (endpoint, data) => {
    let response = null;
    await axios
        .post(`${configs.API_HOST}${endpoint}`, data, {
            withCredentials: true,
        })
        .then((res) => {
            response = res;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
    return response;
};

export { getReq, postReq };
