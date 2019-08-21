import { http } from '.'
import { getAuthorities } from '@/common/resource'

export interface LoginReq {
    username: string
    password: string
}

export interface LoginRes {
    token?: string
}

export function login (req: LoginReq) {
  return http().post<LoginRes>(`/login`, req)
}

export function logout () {
  return http().delete(`/logout`)
}

export function loadPrinciple () {
  return http().get<any>(`/principle`).then((v: any) => {
    return Object.assign(v, { authorities: getAuthorities((v.roles || []).map((w: any) => w.code)) })
  })
}
