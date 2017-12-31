import {playMode} from '@/common/js/config'
const state = {
  singer: {},
  playing: false, // 播放或暂停
  fullScreen: false,  // 全屏
  playList: [], // 播放列表
  sequenceList: [], // 播放列表
  mode: playMode.sequence,  // 播放模式
  currentIndex: -1, // 当前播放索引
  disc: {}, // 推荐歌单
  topList: {} // 排行榜
}

export default state
