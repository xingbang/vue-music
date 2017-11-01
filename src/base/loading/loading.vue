<template>
  <div class="loading">
    <div class="loading-css3"></div>
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .loading
    width: 100%
    text-align: center
    .loading-css3
      background-color: #279fcf
      border-radius: 100%
      margin: 2px
      -webkit-animation-fill-mode: both
      animation-fill-mode: both
      border: 2px solid yellow
      border-bottom-color: transparent
      height: 25px
      width: 25px
      background: transparent !important
      display: inline-block
      -webkit-animation: rotate 0.75s 0s linear infinite
      animation: rotate 0.75s 0s linear infinite  
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
  @-webkit-keyframes rotate
    0%
      -webkit-transform: rotate(0deg)
      transform: rotate(0deg)
    50%
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    100%
      -webkit-transform: rotate(360deg)
      transform: rotate(360deg)
  @keyframes rotate
    0%
      -webkit-transform: rotate(0deg)
      transform: rotate(0deg)
    50%
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    100%
      -webkit-transform: rotate(360deg)
      transform: rotate(360deg)
</style>