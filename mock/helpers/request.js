export function normalize (params = {}, query = true) {
  let ret = Object.assign({}, params)
  delete ret._t
  Object.keys(ret).forEach(v => {
    let value = ret[v]
    if (query) {
      if ((+value) === -1) ret[v] = null
      if (!value) delete ret[v]
    }
    if (['true', 'false'].includes(value)) ret[v] = value === 'true'
  })
  return ret
}
