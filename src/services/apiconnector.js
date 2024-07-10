import axios from "axios";

export const axiosInstance = axios.create({});     // threw create method we can call any method we wanna call like get , put post etc

export const apiConnector = (method , url , bodyData , params , headers) => {
    return axiosInstance({
        url : `${url}`,
        method : `${method}`,
        data : bodyData ? bodyData : null,
        params : params ? params : null,
        headers : headers ? headers : null,
    })
}