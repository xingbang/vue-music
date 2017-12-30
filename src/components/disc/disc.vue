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
          console.log(res)
          this.songs = this._nomalSongs(res.cdlist[0].songlist)
        })
      },
      _nomalSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
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
