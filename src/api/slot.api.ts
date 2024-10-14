import { AxiosResponse } from 'axios'
import { api } from 'src/boot/axios'
import { User } from 'src/components/models'
import { useSlotStore } from 'src/store/slot.store'

const slotStore = useSlotStore()

export const getAllSlot = async (keyword: string | null = null, status: string | null = null) => {
  const response: AxiosResponse = await api.get('/slot-parking/view-all-slot-parking-in-location', {
    params: {
      keyword,
      status,
    }
  })

  slotStore.setSlots(response.data.data)
  slotStore.setMeta(response.data.meta)
}

export const viewActualSlot = async (id: number) => {
  const response = await api.get(`/slot-parking/view-actual-slot-parking-in-location/${id}`);

  return response.data.data.image
}

export const getSlotsByLocationId = async (locationId: number, keyword?: string | null) => {
  const response: AxiosResponse = await api.get(`/parking-slots/${locationId}`, {
    params: {
      keyword
    }
  });

  return response.data
}

export const createSlot = async (extractLocation: string, priceHour: number, image: File, locationId: number) => {
  const formData = new FormData();
  formData.append('extractLocation', extractLocation);
  formData.append('priceHour', priceHour.toString());
  formData.append('file', image);
  formData.append('locationId', locationId.toString());

  await api.post('/parking-slots', formData)
}

export const getDetailSlot = async (id: number) => {
  const response: AxiosResponse = await api.get(`/parking-slots/slot/${id}`);
  return response.data
}

export const updateSlot = async (id: number, extractLocation: string, priceHour: number, image: File | null, coUser: User) => {
  const formData = new FormData();
  formData.append('extractLocation', extractLocation);
  formData.append('priceHour', priceHour.toString());
  if (coUser.id){
    formData.append('coUserId', coUser.id.toString());
  }

  if (image) {
    formData.append('file', image);
  }
  await api.put(`/parking-slots/${id}`, formData)
}

export const getSlotOfCoUser = async (keyword?: string) => {
  const response: AxiosResponse = await api.get('/parking-slots', {
    params: {
      keyword
    }
  })

  return response.data
}
