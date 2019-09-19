import { http } from '.'

export interface LinkQueryReq {
    creationBy?: string
}

export interface LinkQueryRes {
    id: number
    code: string
    password?: string
    creationBy: string
    creationTime: string
    expiryTime: string
    files: any[]
}

export interface LinkAddReq {
    password?: string
    expiryTime?: string
    files: number[]
}

// export interface UserPatchReq {
//     username?: string
//     cname?: string
//     ip?: string
//     deptId?: number
//     status?: boolean
// }

export interface LinkRes {
    id: number
    code: string
    password?: string
    creationBy: string
    creationTime: string
    expiryTime: string
    files: any[]
}

export function queryLinks (req: LinkQueryReq) {
  return http().get<LinkQueryRes[]>(`/links`, { params: req })
}

export function addLink (req: LinkAddReq) {
  return http().post<number>(`/links`, req)
}

// export function patchLink(id: number, req: LinkPatchReq) {
//     return http().patch<void>(`/users/${id}`, req)
// }

export function getLink (id: number) {
  return http().get<LinkRes>(`/links/${id}`)
}

export function deleteLink (id: number) {
  return http().delete<void>(`/links/${id}`)
}
