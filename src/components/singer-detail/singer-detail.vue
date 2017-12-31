<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {singerDetail} from '@/api/singer'
  import {getSongUrl} from '@/api/song'
  import {createSong} from '@/common/js/song'
  import MusicList from '@/components/music-list/music-list'
  export default{
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        return this.singer.name
      },
      bgImage () {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      this._getSingerDetail(this.singer.id)
    },
    methods: {
      // 获取歌手详情
      _getSingerDetail (singerId) {
        this.$http.jsonp(singerDetail(singerId), {jsonp: 'jsonpCallback'}).then((res) => {
          this.songs = this._normalizeSongs(res.data.data.list)
          // console.log(res.data)
        }, (err) => {
          console.log(err)
        })
      },
      // 获取歌手的歌单
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item, index) => {
          let {musicData} = item
          if (musicData.songid && musicData.songmid) {
            ret.push(createSong(musicData))
            getSongUrl(musicData.songmid).then((res) => {
              let data = res.data.items[0]
              ret[index].url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=8421138817&uin=0&fromtag=66`
            })
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background
.slide-enter-active,.slide-leave-active
  transition: all 0.3s
.slide-enter,.slide-leave-to
  transform: translate3d(100%,0,0)
</style>