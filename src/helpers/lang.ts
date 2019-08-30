const hyphenateExp = /\B([A-Z])/g

export function hyphenate (name: string) {
  return name.replace(hyphenateExp, (_, c: string) => '-' + c.toLowerCase()).toLowerCase()
}
