import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios'
import { InfoResponse, InfoResponseData, User } from 'src/components/models';
import { useAuthStore } from 'src/store/auth.store';
import { useStaffStore } from 'src/store/staff.store'

const staffStore = useStaffStore()

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

export const addDeviceToken = async (token: string) => {
  await api.post('/users/add-device-token', {
    deviceToken: token
  })
}

export const getAllUsers = async () => {
  const response: AxiosResponse = await api.get('/users')

  console.log(response.data);

  staffStore.setStaffs(response.data.map((manager: User) => ({ ...manager, location: manager.location?.location })))
  staffStore.setMeta({
    total: response.data.length,
    page: 1,
    perPage: 10
  })
  return response.data
}

export const getUserById = async (id: number) => {
  const response: AxiosResponse = await api.get(`/users/${id}`)
  return response.data
}

export const resetPasswordUser = async (newPassword: string, userId: number) => {
  await api.put(`/users/change-password-user/${userId}`, {
    newPassword
  })
}
