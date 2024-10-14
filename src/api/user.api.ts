import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios'
import { InfoResponse, InfoResponseData } from 'src/components/models';
import { useAuthStore } from 'src/store/auth.store';

const authStore = useAuthStore();

export const getInfo = async () => {
  const response: AxiosResponse<InfoResponse> = await api.get('/users/info');

  authStore.setInfo(response.data as unknown as InfoResponseData);
}

export const getUser = async (email: string) => {
  const response: AxiosResponse = await api.get('/users', {
    params: {
      email
    }
  })

  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addPayment = async (data: any) => {
  await api.post('/users/add-payment', data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changePassword = async (data: any) => {
  await api.put('/users/change-password', data)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeWithdrawRequest = async (data: any) => {
  await api.post('/users/make-request-withdrawal', data)
}

export const getWithdrawRequest = async () => {
  const response: AxiosResponse = await api.get('/users/withdrawal')
  return response.data
}
