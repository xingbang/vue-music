<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="topList">
      <ul>
        <li class="item" v-for="item in topList" @click="select(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {rankUrl} from '@/api/rank'
  import Loading from '@/base/loading/loading'
  import Scroll from '@/base/scroll/scroll'
  import {playListMixin} from '@/common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playListMixin],
    created () {
      setTimeout(() => {
        this._rankList()
      }, 1000)
    },
    data () {
      return {
        topList: []
      }
    },
    methods: {
      handlePlayList (playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.topList.refresh()
      },
      _rankList () {
        this.$http.jsonp(rankUrl(), {jsonp: 'jsonpCallback'}).then((res) => {
          //  console.log(res.data.data)
          this.topList = res.data.data.topList
        }, (err) => {
          console.log(err)
        })
      },
      select (item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>