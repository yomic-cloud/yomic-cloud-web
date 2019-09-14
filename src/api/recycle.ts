import { http } from '.'

export interface RecycleQueryReq {
    creationBy?: string
}

export interface RecycleQueryRes {
    id: number
    creationBy: string,
    creationTime: string,
    file: any
}

export interface RecycleAddReq {
    fileId: number
}

export interface RecycleRes {
    id: number
    creationBy: string,
    creationTime: string,
    file: any
}

export function queryRecycles (req: RecycleQueryReq) {
  return http().get<RecycleQueryRes[]>(`/recycles`, { params: req })
}

export function addRecycle (req: RecycleAddReq) {
  return http().post<number>(`/recycles`, req)
}

export function getRecycle (id: number) {
  return http().get<RecycleRes>(`/recycles/${id}`)
}

// 标注删除或还原
export function deleteRecycle (id: number, recover: boolean = false) {
  return http().delete<void>(`/recycles/${id}`, { params: { recover } })
}
