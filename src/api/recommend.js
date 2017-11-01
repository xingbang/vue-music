import axios from 'axios'
export function picUrl () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=684129064&uin=1329742628&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1504693622721'
  return url
}
export function getDiscList () {
  const url = '/api/getDiscList'

  const data = {
    g_tk: '84129064',
    uin: '1329742628',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  }

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}
