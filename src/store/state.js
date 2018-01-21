import {playMode} from '@/common/js/config'
import {loadSearch, loadPlay, loadFav} from '@/common/js/cache'
const state = {
  singer: {},
  playing: false, // 播放或暂停
  fullScreen: false,  // 全屏
  playList: [], // 播放列表
  sequenceList: [], // 播放列表
  mode: playMode.sequence,  // 播放模式
  currentIndex: -1, // 当前播放索引
  disc: {}, // 推荐歌单
  topList: {}, // 排行榜
  searchHistory: loadSearch(), // 搜索历史
  playHistory: loadPlay(), // 播放历史
  favList: loadFav() // 喜欢歌曲列表
}

export default state
