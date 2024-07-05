import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method , url , bodyData , params , headers) => {
    return axiosInstance({
        url : `${url}`,
        method : `${method}`,
        data : bodyData ? bodyData : null,
        params : params ? params : null,
        headers : headers ? headers : null,
    })
}