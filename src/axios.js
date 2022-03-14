import axios from "axios";
const instance = axios.create({
    baseURL: "https://mallapi.duyiedu.com/",
});
instance.interceptors.request.use((config) => {
    if(config.url.includes('/passport')) {
        return config;
    }
    return {
        ...config,
        params: {
            ...config.params,
            appkey: 'See_1647013468758',
        }
    }
}, (error) => Promise.reject(error));
instance.interceptors.response.use((response) => {
    //console.log(response);
    return response;
}, (error) => Promise.reject(error));


export default instance;