import { http } from '.'

export interface DeptQueryReq {
  name?: string
  parentId?: number
}

export interface DeptQueryRes {
  id: number
  name: string
  parentId?: number
}

export function queryDepts(req: DeptQueryReq) {
  return http().get<DeptQueryRes[]>(`/depts`, {params: req})
}
