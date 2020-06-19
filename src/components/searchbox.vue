<style  scoped>
/* 搜索栏 */
.search {
  width: 100%;
  height: 96rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}
.search_box {
  width: 550rpx;
  height: 60rpx;
  border-radius: 60rpx;
  background-color: #f7f7f7;
  font-size: 25rpx;
  display: flex;
  align-items: center;
}
.search_box input {
  height: 100%;
  width: 550rpx;
}
.searchIcon {
  height: 25rpx;
  width: 23rpx;
  margin-left: 31rpx;
  margin-right: 18rpx;
}
.search_info .info_box {
 border-bottom: 1rpx solid #dddddd;
}
button{
  padding: 0;
  margin: 0;
  font-size: 28rpx;
  width: 100rpx;
  margin-left: 20rpx;
  background: #ffffff;
}

button::after{
  border: none;
}

</style>

<template>
   <!-- 搜索栏 -->
    <view class="search">
    <view class="search_box">
      <image class="searchIcon" src="../../images/icon_sousuo@2x.png" />
        <slot name="search"><input placeholder="搜索" /></slot>
   </view>
    <slot name="sbtn"><button>搜索</button></slot>
    </view>
</template>

<script>
import wepy from "wepy";
export default class SearchBox extends wepy.page {
  
  data = {};

  computed = {};

  components = {};

  methods = {};
}
</script>
