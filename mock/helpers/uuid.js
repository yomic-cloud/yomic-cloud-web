let index = 1

export function genUuid () {
  return Date.now() + (++index) + ''
}

export function genId () {
  return +genUuid()
}
