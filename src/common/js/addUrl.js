export default function addUrl (url, data) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return url
}

export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
