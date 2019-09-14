export function formatDate (date, type = 'datetime') {
  let year = date.getFullYear()
  let month = pend(date.getMonth() + 1)
  let day = pend(date.getDate())
  let hour = pend(date.getHours())
  let min = pend(date.getMinutes())
  let sec = pend(date.getSeconds())
  let d = year + '/' + month + '/' + day
  let t = hour + ':' + min + ':' + sec
  if (type === 'datetime') return d + ' ' + t
  if (type === 'date') return d
  if (type === 'time') return t

  function pend (str) {
    return ('0' + str).substr(-2)
  }
}
