import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { ErrorResponse } from 'src/components/models';

const apiGoongMap = axios.create({ baseURL: process.env.GOONG_MAP_URL });

apiGoongMap.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: process.env.GOONG_API_KEY,
  };

  return config;
}, (error) => {
  return Promise.reject(error);
});

apiGoongMap.interceptors.response.use(function (response: AxiosResponse) {
  if (response.status === 201) {
    Swal.fire({
      title: 'Success!',
      text: response.data.message,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }
  return response;
}, function (error: AxiosError) {
  Swal.fire({
    title: 'Error!',
    text: (error.response?.data as ErrorResponse).message,
    icon: 'error',
    confirmButtonText: 'Ok'
  })
  return Promise.reject(error);
});

apiGoongMap.defaults.withCredentials = true


export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = apiGoongMap;
});

export { apiGoongMap };
