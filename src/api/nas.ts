import { http } from '.'
import { AxiosRequestConfig } from 'axios'

export function upload (formData: FormData, config: AxiosRequestConfig) {
  return http().post<string>(`/nas/upload`, formData, config)
}

export function download (uuid: string) {
  return http().get<Blob>(`/nas/download/${uuid}`, { responseType: 'blob' })
}

export function remove (uuid: string) {
  return http().delete<string>(`/nas/remove/${uuid}`)
}
