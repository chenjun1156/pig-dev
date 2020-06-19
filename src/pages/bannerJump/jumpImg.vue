<style  scoped>
.imgStyle{
  width: 100%;
}
.img_title{
  padding:20rpx;
  width:100%;
  min-height:300rpx;
}
</style>

<template>
  <view class='container'>
    <image class="imgStyle" src='{{imgurl}}' mode="widthFix"/>
    <view class="img_title">{{imgtitle}}</view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class JumpImg extends wepy.page {
   config = {
    navigationBarTitleText: "跳转图片"
  };
  data = {
    imgurl:"",
    imgtitle:""
  };

  components = {
  };

  onLoad(options) {
    this.imgurl = options.imgurl;
    this.imgtitle = options.title;
    console.log(this.imgurl)
  }
  onShow() {};
}
</script>