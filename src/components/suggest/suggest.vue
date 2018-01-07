<template>
  <scroll class="suggest" 
          :data="result" 
          :pullUp="pullUp"
          @scrollToEnd="serchMore"
          ref="suggest"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getItemCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayBame(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import NoResult from '@/base/no-result/no-result'
import {suggestUrl} from '@/api/search'
import {createSong} from '@/common/js/song'
import {getSongUrl} from '@/api/song'
import Loading from '@/base/loading/loading'
import Singer from '@/common/js/singer'
import {mapMutations, mapActions} from 'vuex'
const SINGER_TYPE = 'singer'
const perpage = 20
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      result: [],
      pullUp: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  methods: {
    // 搜索
    search () {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      this.$http.jsonp(suggestUrl(this.query, this.page, 1, perpage), {jsonp: 'jsonpCallback'}).then((res) => {
        this.result = this._getResult(res.data.data)
        this._checkMore(res.data.data)
      }, (err) => {
        console.log(err)
      })
    },
    // 搜索更多
    serchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      this.$http.jsonp(suggestUrl(this.query, this.page, 1, perpage), {jsonp: 'jsonpCallback'}).then((res) => {
        this.result = this.result.concat(this._getResult(res.data.data))
        this._checkMore(res.data.data)
        console.log(this.result)
      }, (err) => {
        console.log(err)
      })
    },
    // 判断是否有更多
    _checkMore (data) {
      let song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    // 搜索歌手，歌曲图标
    getItemCls (item) {
      if (item.type === SINGER_TYPE) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    // 搜索歌手，歌曲列表内容
    getDisplayBame (item) {
      if (item.type === SINGER_TYPE) {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    // 搜索的歌手，歌曲内容从新拼接
    _getResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: SINGER_TYPE}})
      }
      if (data.song) {
        ret = ret.concat(this._normalSongs(data.song.list))
      }
      return ret
    },
    _normalSongs (list) {
      let ret = []
      list.forEach((musicData, index) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
          getSongUrl(musicData.songmid).then((res) => {
            let data = res.data.items[0]
            ret[index].url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=8421138817&uin=0&fromtag=66`
          })
        }
      })
      return ret
    },
    // 列表点击
    selectItem (item) {
      if (item.type === SINGER_TYPE) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    listScroll () {
      this.$emit('listScroll')
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query () {
      this.search()
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
