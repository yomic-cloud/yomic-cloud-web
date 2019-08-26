export const UMASK = {
  ACCESS: { value: 1, desc: '可见' },
  MK_DIR: { value: 1 << 1, desc: '新建文件夹' },
  NEW_FILE: { value: 1 << 2, desc: '新建文件' },
  UPDATE_FILE: { value: 1 << 3, desc: '修改文件' },
  RENAME: { value: 1 << 4, desc: '重命名文件' },
  RECYCLE: { value: 1 << 5, desc: '回收文件' },
  PREVIW: { value: 1 << 8, desc: '预览文件' },
  DOWNLOAD: { value: 1 << 9, desc: '下载文件' },
  LINK: { value: 1 << 10, desc: '生成外链' }
}

export function hasAnyAuthority (umask: number, ...bits: number[]) {
  return bits.some(v => {
    return (umask & v) === v
  })
}

export function toArray (umask: number) {
  let ret: any[] = []
  Object.keys(UMASK).forEach((key: string) => {
    let value = (UMASK as any)[key].value
    if (hasAnyAuthority(umask, value)) ret.push(value)
  })
  return ret
}

export function toUmask (list: number[]) {
  let ret = 0
  list.forEach(v => {
    ret = ret | v
  })
  return ret
}
