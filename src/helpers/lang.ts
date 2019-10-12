const hyphenateExp = /\B([A-Z])/g

export function hyphenate (name: string) {
  return name.replace(hyphenateExp, (_, c: string) => '-' + c.toLowerCase()).toLowerCase()
}

export function clone (obj: any, ignoreEmpty: boolean = false) {
  let ret = Object.assign({}, obj)
  if (ignoreEmpty) {
    Object.keys(ret).forEach(v => {
      if (!ret[v] && ret[v] !== 0 && ret[v] !== false) delete ret[v]
    })
  }
  return ret
}

export function randomString (len: number = 6) {
  const nums = range(48, 58)
  const chars = range(63, 91)
  const all = [...nums, ...chars]
  let ret = []
  for (let i = 0; i < len; i++) {
    let sum = Math.floor(Math.random() * 1000)
    let remainder = sum % all.length
    let ch = String.fromCharCode(all[remainder])
    ret.push(ch)
  }
  return ret.join('')
}

export function range (start: number = 0, end: number, step: number = 1) {
  let ret = []
  for (let i = start; i < end; i++) {
    ret.push(i)
  }
  return ret
}
