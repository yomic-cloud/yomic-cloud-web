import { http } from '.'
import { FileQueryReq, FileRes } from './file'
import { LinkRes } from './link'

export function getLink (linkId: number) {
  return http().get<LinkRes>(`/shares/${linkId}`)
}

export function queryFiles (linkId: number, password: string, fileParentId?: number) {
  return http().get<FileQueryReq[]>(`/shares/${linkId}/files`, { params: { password, fileParentId } })
}

export function getFile (linkId: number, password: string, fileId: number) {
  return http().get<FileQueryReq[]>(`/shares/${linkId}/files/${fileId}`, { params: { password } })
}

export function preview (linkId: number, password: string, fileId: number) {
  return http().get<Blob>(`/shares/${linkId}/files/${fileId}/preview`, { params: { password }, responseType: 'blob' })
}

export function download (linkId: number, password: string, fileId: number) {
  return http().get<Blob>(`/shares/${linkId}/files/${fileId}/download`, { params: { password }, responseType: 'blob' })
}
