import axios, {type InternalAxiosRequestConfig, type AxiosInstance, type AxiosResponse} from 'axios';

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000
});
// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 可以在这里添加请求头
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// const obj = {
//   data:{},
//   code:200,
//   message:'success'
// }

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 可以在这里处理响应数据
        const res = response.data;
        if (!res.success) {
            window.alert(res.message || '请求错误');
            // 可以在这里处理错误
            return Promise.reject(res.message || 'Error');
        }
        return res.data;
    },
    (error) => {
        // 可以在这里处理错误
        const status = error.response?.status;
        if (status === 401) {
            // 处理未登录的情况
            window.alert('未登录，请重新登录');
            // router.replace('/login');
            // 可以在这里跳转到登录页面
        }
        return Promise.reject(error);
    }
);

export default service;
