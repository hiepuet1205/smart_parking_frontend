import { AxiosResponse } from 'axios'
import { api } from 'src/boot/axios'
import { useRequestStore } from 'src/store/request.store'

const requestStore = useRequestStore()

export const getAllRequest = async (status: string[] | null = null) => {
  const response: AxiosResponse = await api.get('/rent-requests', {
    params: {
      status,
    }
  })

  console.log(response.data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestStore.setRequests(response.data.map((request: any) => ({ ...request, startTime: new Date(request.startTime).toLocaleString(), endTime: new Date(request.endTime).toLocaleString() })))
  // requestStore.setMeta(response.data.meta)
}

export const getAllRequestAdmin = async (status: string[] | null = null) => {
  const response: AxiosResponse = await api.get('/rent-requests/admin/', {
    params: {
      status,
    }
  })

  console.log(response.data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestStore.setRequests(response.data.map((request: any) => ({ ...request, startTime: new Date(request.startTime).toLocaleString(), endTime: new Date(request.endTime).toLocaleString() })))
  // requestStore.setMeta(response.data.meta)
}

export const changeStatusManager = async (id: number, status: string) => {
  await api.put(`/rent-request/${id}`, {
    status
  })
}
