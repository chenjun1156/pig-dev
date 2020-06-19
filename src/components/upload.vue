<style  scoped>
  .icon_box{
    width: 230rpx;
    height: 220rpx;
    background-color: #eeeeee;
    margin-top: 20rpx;
    border:1rpx solid #cecece;
    overflow:hidden;
   position: relative;
  }
  .icon_box view{
    height: 3rpx;
    width: 52rpx;
    background: #999999;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -1.5rpx;
    margin-left: -26rpx;
  }
   .icon_box view:first-of-type{
     transform: rotate(90deg)
   }
     .upload_content {
       display: flex;
       flex-wrap: wrap;
       align-items: flex-end;
     }
   .upload_content image{
     width: 100rpx;
    height: 90rpx;
    margin:5rpx;
   }
   .upimg_wrap{
     width: 440rpx;
   }

</style>

<template>
  <view class="section" @tap="testbtn()" >
  <text>上传图片</text>
  <view class="upload_content">
  <view class="icon_box">
    <view></view>
    <view></view>
  </view>
  <view class="upimg_wrap">
  <image wx:for="{{imgList}}" wx:for-index="index" wx:key="{{this}}" wx:for-item="item"  src="{{item}}"  mode="aspectFit" bindtap="clickImage({{index}})"/>
  </view>
  </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { uploadSeriesFile } from "../utils/tencent-cos";
export default class UpLoad extends wepy.page {
  
  data = {
     //文件上传
      uploadRes:null,
      //上传的图片列表
      imgList:[],
      //禁止
      isBan:true,
  };

  computed = {};

  components = {};

  methods = {
    //图片预览
      clickImage(e) {
         wx.previewImage({
           current: this.imgList[e],
           urls: this.imgList,
            fail: function() {
         　　　　console.log('fail')
      　　　　 },
           complete: function () {
               console.info("点击图片了");
           },
       })
      }
  };

  testbtn() {
   
    if(this.imgList.length>=8){
      wx.showToast({
          title: "最多上传8张图片",
          icon: "none",
          duration: 1000
        });
        this.isBan=false;
    }
    let that = this;
    wx.chooseImage({
      count: 5, //一次上传图片数量,最多为9张
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.upImg(tempFilePaths);
      }
    });
    return this.isBan;
  }
  async upImg(imgurls) {
    wx.showLoading({
      title: "上传图片中"
    });
    //uploadSeriesFile 函数 传入的参数imgurls需为数组
    this.uploadRes = await uploadSeriesFile(imgurls);
    console.log(this.uploadRes);
    this.imgList=this.imgList.concat(this.uploadRes)
     wx.hideLoading();
    this.$apply()
  }
}
</script>
