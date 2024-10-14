import { AxiosResponse } from 'axios'
import { api } from 'src/boot/axios'
import { apiGoongMap } from 'src/boot/axios-goong-map';

export const getAllLocation = async () => {
  const response: AxiosResponse = await api.get('/locations')
  return response.data;
}

export const getAllLocationOfUser = async (keyword?: string) => {
  const response: AxiosResponse = await api.get('/locations/user', {
    params: {
      keyword
    }
  })
  return response.data;
}

export const getListLocationByKeyword = async (keyword: string) => {
  const response: AxiosResponse = await apiGoongMap.get('/Place/AutoComplete', {
    params: {
      input: keyword
    }
  })
  return response.data;
}

export const createLocation = async (name: string, placeId: string, file: File) => {
  const form = new FormData();
  form.append('name', name);
  form.append('placeId', placeId);
  form.append('file', file);
  await api.post('/locations', form)
}

export const deleteLocation = async (id: number) => {
  await api.delete(`/locations/${id}`)
}
