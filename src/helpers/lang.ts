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
