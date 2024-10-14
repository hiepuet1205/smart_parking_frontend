import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { ErrorResponse } from 'src/components/models';

const api = axios.create({ baseURL: process.env.BACKEND_BASE_URL });

api.interceptors.response.use(function (response: AxiosResponse) {
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
  if (error.response?.status === 403) {
    localStorage.clear();
    window.location.href = '/login';
  }

  Swal.fire({
    title: 'Error!',
    text: (error.response?.data as ErrorResponse).message,
    icon: 'error',
    confirmButtonText: 'Ok'
  })
  return Promise.reject(error);
});

api.defaults.withCredentials = true


export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
