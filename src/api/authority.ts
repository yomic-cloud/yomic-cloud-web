import { http } from '.'

export interface AuthorityQueryReq {
  isUser?: boolean
  principleId?: number
  fileId?: number
}

export interface AuthorityQueryRes {
  id: number
  principleId: number
  fileId: number
  idUser: boolean
  isDir: boolean
  umask: number
  validDays?: number
  // principleId: number
  // isUser: boolean
  // fileName: string
}

export interface AuthorityAddReq {
  isUser: boolean
  principleId: number
  fileId: number
  umask: number
  validDays?: number
}

export interface AuthorityPatchReq {
  umask?: number
  validDays?: number
}

export interface AuthorityRes {
  id: number
  principleId: number
  fileId: number
  idUser: boolean
  isDir: boolean
  umask: number
  validDays?: number
}

export function queryAuthorities (req: AuthorityQueryReq) {
  return http().get<AuthorityQueryRes[]>(`/authorities`, { params: req })
}

export function addAuthority (req: AuthorityAddReq) {
  return http().post<number>(`/authorities`, req)
}

export function patchAuthority (id: number, isUser: boolean, req: AuthorityPatchReq) {
  return http().patch<void>(`/authorities/${id}`, req, { params: { isUser } })
}

export function getAuthority (id: number, isUser: boolean) {
  return http().get<AuthorityRes>(`/authorities/${id}`, { params: { isUser: isUser } })
}

export function deleteAuthority (id: number, isUser: boolean) {
  return http().delete<void>(`/authorities/${id}`, { params: { isUser: isUser } })
}
