import { http } from '.'

export interface UserQueryReq {
  username?: string
  cname?: string
  deptId?: number
  status?: boolean
}

export interface UserQueryRes {
  id: number
  username: string
  cname: string
  deptId?: number
  ip?: string
  status: boolean
  deptName?: string
}

export interface UserAddReq {
  username: string
  cname: string
  ip?: string
  deptId?: number
}

export interface UserPatchReq {
  username?: string
  cname?: string
  ip?: string
  deptId?: number
  status?: boolean
}

export interface UserRes {
  id: number
  username: string
  cname: string
  deptId?: number
  ip?: string
  status: boolean
  deptName?: string
}

export function queryUsers (req: UserQueryReq) {
  return http().get<UserQueryRes[]>(`/users`, { params: req })
}

export function addUser (req: UserAddReq) {
  return http().post<number>(`/users`, req)
}

export function patchUser (id: number, req: UserPatchReq) {
  return http().patch<void>(`/users/${id}`, req)
}

export function getUser (id: number) {
  return http().get<UserRes>(`/users/${id}`)
}

export function deleteUser (id: number) {
  return http().delete<void>(`/users/${id}`)
}
