import axios from 'axios'

export function getLyric (mid) {
  const url = '/api/lyric'
  const data = {
    songmid: mid,
    pcachetime: +new Date(),
    g_tk: 5381,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  }

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

