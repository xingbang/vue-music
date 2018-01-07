export function searchUrl () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
  return url
}
export function suggestUrl (query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.all&w=' + query + '&catZhida=1' + zhida + '&p=' + page + '&n=' + perpage + '&perpage=' + perpage
  return url
}
