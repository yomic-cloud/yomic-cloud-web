import { http } from '.'

export interface FileQueryReq {
  parentId?: number

  dir?: boolean

  creationBy?: string

  status?: boolean

  personal?: boolean
}

export interface FileQueryRes {
  id: number

  parentId?: number

  dir: boolean

  name: string

  contentType?: string

  size?: number

  uuid?: string

  creationBy: string

  creationTime: string

  lastChangeBy: string

  lastChangeTime: string

  status: boolean

  limitSize?: number

  limitSuffix?: string

  personal?: boolean

  records: any[]
}

export interface FileAddReq {

  parentId?: number

  dir: boolean

  name: string

  uuid?: string

  limitSize?: number

  limitSuffix?: string

  personal: boolean
}

export interface FilePatchReq {

  name?: string

  uuid?: string

  limitSize?: string

  limitSuffix?: string

  remark?: string
}

export interface FileRes {
  id: number

  parentId?: number

  dir: boolean

  name: string

  contentType?: string

  size?: number

  uuid?: string

  creationBy: string

  creationTime: string

  lastChangeBy: string

  lastChangeTime: string

  status: boolean

  limitSize?: number

  limitSuffix?: string

  personal?: boolean

  records: any[]

  parent?: FileRes
}

export function queryFiles (req: FileQueryReq) {
  return http().get<FileQueryRes[]>(`/files`, { params: req })
}

export function addFile (req: FileAddReq) {
  return http().post<number>(`/files`, req)
}

export function patchFile (id: number, req: FilePatchReq) {
  return http().patch<void>(`/files/${id}`, req)
}

export function getFile (id: number) {
  return http().get<FileRes>(`/files/${id}`)
}

export function deleteFile (id: number) {
  return http().delete<void>(`/files/${id}`)
}

export function downloadFile (id: number) {
  return http().get<Blob>(`/files/${id}/download`, { responseType: 'blob' })
}
