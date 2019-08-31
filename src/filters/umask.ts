import { UMASK, hasAnyAuthority } from '@/common/umask'

export default function (value: number) {
  if (value === -1) return '全部权限'
  return Object.values(UMASK)
    .filter((v: any) => hasAnyAuthority(value, v.value))
    .map((v: any) => v.desc).join(',')
}
