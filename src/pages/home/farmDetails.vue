<style  scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
}
.details_img_box {
  height: 400rpx;
}
.details_img {
  height: 400rpx;
  width: 100%;
}
.details {
  font-size: 26rpx;
  background-color: #ffffff;
  color: #666666;
}

.details_content {
  margin: 0 19rpx;
  display: flex;
  flex-flow: column nowrap;
  padding-top: 19rpx;
  box-sizing: border-box;
  word-wrap: break-word;
}
.details_content > text {
  margin-bottom: 30rpx;
}
.details_content .info_title {
  color: #333333;
  font-size: 31rpx;
}
.site_title{
    margin: 20rpx;
}
.farm_site image{
    width: 100%;
    height: 400rpx;
    margin-bottom: 20rpx;
    display: block;
}

.swiper {
  height: 400rpx;
  background: #C6C6D1;
}
.swiper image {
  width: 100%;
  height: 400rpx;
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
   <view class="details">
    <view class="details_content">
       <text class="info_title">信息详情</text>
       <text>地址：{{info.address}}</text>
       <text>规模：{{info.scale}}</text>
       <text>建厂日期：{{info.b_ctime}}</text>
       <text>建筑面积：{{info.area}}平方米</text>
       <text>具体描述：{{info.desc}}</text>
   </view>
   </view>
    <view class="remark">
      <view class="remark_title" style="margin:20rpx">详情视图</view>
     <repeat for="{{info.remark}}" key="index" item="item" index="index">
     <view class="remark_item">
      <view wx:if="{{item[0]}}" class="remark_text">{{item[0]}}</view>
     <view wx:if="{{item[1]}}" ><image src="{{item[1]}}" class="remark_width" mode="aspectFill" @tap="clickImg({{index}})" /></view>
     <view wx:if="{{item[2]}}" ><video src="{{item[2]}}" class="remark_width" objectFit="cover" /></view>
     </view>
     </repeat>
   </view>
    <!-- 联系电话 -->
   <view class="details_phone">
     <view class="seller">{{info.name}}</view>
     <view class="seller_phone" @tap="userPhone"><image src="../../images/icon_dianhua@2x.png"></image><text>电话</text></view>
   </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class FramDetails extends wepy.page {
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
    info: "",
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
  };

  //获取详情
  async getDetails() {
    const res = await shttp
      .get(`/api/v1/home/piggeryleaseinfo`)
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
  //拨打电话
  userPhone() {
    wx.makePhoneCall({
      phoneNumber: this.info.telephone
    });
  }

  
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

