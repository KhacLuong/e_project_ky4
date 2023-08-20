import axios from "axios"
import NProgress from "nprogress"
import {store} from '../redux/store'
import {fetchLogout, fetchRefreshToken} from "../redux/slices/authSlice.jsx";

const instance = axios.create({
    baseURL: 'http://localhost:9090/api/v1/',
})
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})
// Add a request interceptor
instance.interceptors.request.use( (config) => {
    // Do something before request is sent
    const accessToken = store.getState().auth.account.accessToken
    const refreshToken = store.getState().auth.account.refreshToken
    config.headers["Authorization"] = `Bearer ${accessToken}`
    config.headers["REFRESH-TOKEN"] = `${refreshToken}`
    NProgress.start()
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response && response.data ? response.data : response;
}, async function (error) {
    const originalRequest = error.config;
    const accessToken = store.getState().auth.account.accessToken
    const refreshToken = store.getState().auth.account.refreshToken
    if ((error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 500) && accessToken && refreshToken) {
        const res = await store.dispatch(fetchRefreshToken()).unwrap()
        if (res && res?.code === 200) {
            instance.defaults.headers.common["Authorization"] = `Bearer ${res?.data?.access_token}`
            instance.defaults.headers.common["REFRESH-TOKEN"] = `Bearer ${res?.data?.refresh_token}`
        } else {
            await store.dispatch(fetchLogout()).unwrap()
        }
        return instance(originalRequest)
    }
    NProgress.done();
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance;
