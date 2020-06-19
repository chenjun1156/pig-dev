<style  scoped>
.container {
  /* background: #f4f4f4; */
}
.details_img_box{
   height: 400rpx;
}
.details_img {
  height: 400rpx;
  width: 100%;
}
.swiper {
  height: 400rpx;
  background: #C6C6D1;
}
.swiper image {
  width: 100%;
  height: 400rpx;
}
.lzdetails{
  padding:10rpx 20rpx 0 20rpx;
}
.lzdetails_title{
    font-size: 34rpx;
    margin-bottom: 29rpx;
    color: #222222;
}
.lzdetails_time{
    font-size: 28rpx; 
    color: #222222;
}
.lzdetails_content{
    font-size: 30rpx;
    color: #666666;
    word-wrap: break-word;
}
.remark{
  margin-top: 0;
  margin-bottom: 20rpx;
}
</style>

<template>
  <view class="container">
   <view class="details_img_box">
      <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots="{{indicatorDots}}" indicator-active-color="{{indicatorActiveColor}}" indicator-color="{{indicatorColor}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" circular="true" >
    <repeat for="{{info.image}}" key="index" index="index" item="item">
      <swiper-item>
        <image src="{{item}}" mode="aspectFill"  bindtap="clickImage({{index}})" />
      </swiper-item>
    </repeat>
    </swiper>
    </view>
    <view class="lzdetails">
         <view class="lzdetails_title">{{info.title}}</view>
        <view class="lzdetails_time">{{info.pub_time}}</view>
  </view>
  <view class="remark">
      <view class="remark_title">详情描述:</view>
     <repeat for="{{info.remark}}" key="index" item="item" index="index">
     <view class="remark_item">
      <view wx:if="{{item[0]}}" class="remark_text">{{item[0]}}</view>
     <view wx:if="{{item[1]}}" ><image src="{{item[1]}}" class="remark_width" mode="aspectFill" @tap="clickImg({{index}})" /></view>
     </view>
     </repeat>
     <view wx:if="{{info.video}}"><video src="{{info.video}}" class="remark_width" objectFit="cover"></video></view>
   </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class ArticleDetails extends wepy.page {
  config = {
    navigationBarTitleText: "详情"
  };
  data = {
      //轮播配置
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#fc5c4f",
    indicatorColor: "#2f2d29",

     id: "",
    info:""
  };

   onLoad(options) {
    //打开转发
    wx.showShareMenu({
      withShareTicket: true
    });
    this.id = options.id;
    console.log(this.id);
    wx.showLoading({
      title: "加载中"
    });
    this.getDetails();
  }

  async getDetails() {
    const res = await shttp
      .get(`/api/v1/home/articleinfo`)
      .query({
        id: this.id
      })
      .end();
    this.info = res.data;
    this.info.image=this.info.image.split(",");
    console.log(this.info);
    if (res.status === 0) {
      if (!this.info) {
        wx.showToast({
          title: "暂无详情",
          icon: "none",
          duration: 1000
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
      wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    this.$apply();
  }

  computed = {};

  components = {};

  methods = {
     //图片预览
    clickImage(e) {
      wx.previewImage({
        current: this.info.image[e],
        urls: this.info.image,
        fail: function() {
          console.log("fail");
        },
        complete: function() {
          console.info("点击图片了");
        }
      });
    },
     //详情图片预览
    clickImg(e) {
      wx.previewImage({
        current: this.info.remark[e][1],
        urls:this.info.remark[e],
      });
    },
  };
}
</script>
