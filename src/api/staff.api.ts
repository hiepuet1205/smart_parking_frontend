import { AxiosResponse } from 'axios'
import { api } from 'src/boot/axios'
import { User } from 'src/components/models'
import { useStaffStore } from 'src/store/staff.store'

const staffStore = useStaffStore()

export const getAllStaff = async (keyword: string | null = null, status: string | null = null) => {
  const response: AxiosResponse = await api.get('/users/staff', {
    params: {
      keyword,
      status,
    }
  })

  staffStore.setStaffs(response.data.data.map((manager: User) => ({ ...manager, location: manager.location?.location })))
  staffStore.setMeta(response.data.meta)
}

export const createStaff = async (name: string, email: string, password: string, image: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('file', image);
  const response = await api.post('/users/staff', formData)

  return response.data
}

export const changeStatusStaff = async (id: number, status: string) => {
  await api.put(`/users/staff/${id}`, {
    status
  })
}
