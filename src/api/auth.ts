import { http } from '.'
import { getAuthorities } from '@/common/resource'

export interface LoginReq {
    username: string
    password: string
}

export interface LoginRes {
    token?: string
}

export interface ChangePasswordReq {
    oldPassword: string
    newPassword: string
}

export function login (req: LoginReq) {
  return http().post<LoginRes>(`/login`, null, { params: req })
}

export function logout () {
  return http().delete(`/logout`)
}

export function loadPrinciple () {
  return http().get<any>(`/auth/principle`).then((v: any) => {
    const roles = (v.roles || []).map((v: any) => ({ code: v }))
    const authorities = getAuthorities(roles.map((w: any) => w.code))
    return Object.assign(v, { roles }, { authorities })
  })
}

export function changePassword (req: ChangePasswordReq) {
  return http().put(`/auth/password`, req)
}
