export function normalize (params = {}, ignore = false) {
  let ret = Object.assign({}, params)
  delete ret._t
  Object.keys(ret).forEach(v => {
    let value = ret[v]
    if ((+value) === -1 && !ignore) ret[v] = null
    if (['true', 'false'].includes(value)) ret[v] = value === 'true'
  })
  return ret
}
