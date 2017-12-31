<template>
  <transition name="slide">
    <music-list :rank="rank" :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import MusicList from '@/components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicUrl} from '@/api/rank'
  import {createSong} from '@/common/js/song'
  import {getSongUrl} from '@/api/song'
  export default{
    data () {
      return {
        songs: [],
        rank: true
      }
    },
    computed: {
      title () {
        return this.topList.topTitle
      },
      bgImage () {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    },
    created () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      setTimeout(() => {
        this._rankMusicList()
      }, 1000)
    },
    methods: {
      _rankMusicList () {
        this.$http.jsonp(getMusicUrl(this.topList.id), {jsonp: 'jsonpCallback'}).then((res) => {
          // console.log(res.data)
          this.songs = this._nomalSongs(res.data.songlist)
        }, (err) => {
          console.log(err)
        })
      },
      _nomalSongs (list) {
        let ret = []
        list.forEach((item, index) => {
          const musicData = item.data
          if (musicData.songid && musicData.albumid) {
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
.slide-enter-active,.slide-leave-active
  transition: all 0.3s
.slide-enter,.slide-leave-to
  transform: translate3d(100%,0,0)
</style>