export function addDays (days: number, date: Date = new Date()) {
  let d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function formatDate (date: Date, format: string = 'yyyy/MM/dd HH:mm:ss') {
  let map: any = {
    yyyy: align(date.getFullYear(), 4),
    MM: align(date.getMonth() + 1),
    dd: align(date.getDate()),
    HH: align(date.getHours()),
    mm: align(date.getMinutes()),
    ss: align(date.getSeconds())
  }

  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  const regex = /(yyyy)|(MM)|(dd)|(HH)|(mm)|(ss)/g
  return format.replace(regex, (_, c) => {
    return map[_]
  })

  function align (text: string | number, num: number = 2) {
    return ('0' + text).substr(-num)
  }
}
