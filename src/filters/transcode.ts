const dict: any = {
  status: {
    true: '有效',
    false: '无效'
  }
}

export default function (value: any, key: string, defaultValue?: any) {
  let ret = dict[key] && dict[key][value]
  if (ret === undefined) return defaultValue === undefined ? value : defaultValue
  return ret
}
