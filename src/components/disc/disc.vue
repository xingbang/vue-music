<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
  import MusicList from '@/components/music-list/music-list'
  import {getSongList} from '@/api/recommend'
  import {mapGetters} from 'vuex'
  import {createSong} from '@/common/js/song'
  import {getSongUrl} from '@/api/song'
  export default {
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        return this.disc.dissname
      },
      bgImage () {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      this._getSongList()
    },
    methods: {
      _getSongList () {
        getSongList(this.disc.dissid).then((res) => {
          this.songs = this._nomalSongs(res.cdlist[0].songlist)
          console.log(this.songs)
        })
      },
      _nomalSongs (list) {
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
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)
</style>
