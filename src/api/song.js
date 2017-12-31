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

export function getSongUrl (mid) {
  // let url = 'http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg?json=3&g_tk=1329742628&loginUin=0&hostUin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&guid=8421138817'
  // let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1928093487&loginUin=0&hostUin=0&format=jsonp&cid=205361747&needNewCode=0&inCharset=utf-8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&guid=8421138817&songmid=' + mid + '&filename=C400' + mid + '.m4a'
  // return url
  const url = '/api/getSongUrl'
  const data = {
    g_tk: 1928093487,
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    cid: 205361747,
    needNewCode: 0,
    uin: 0,
    songmid: mid,
    filename: `C400${mid}.m4a`,
    guid: 8421138817,
    inCharset: 'utf8',
    outCharset: 'utf-8'
  }

  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data)
  })
}

