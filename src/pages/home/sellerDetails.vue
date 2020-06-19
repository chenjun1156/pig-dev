<style  scoped>
.container {
  background: #f4f4f4;
   padding-bottom: 110rpx;
}
.details_img_box {
  height: 400rpx;
}
.details_img {
  height: 400rpx;
  width: 100%;
}
.details {
  padding: 0 20rpx;
  font-size: 28rpx;
  background-color: #ffffff;
}

.details_title {
  height: 77rpx;
  line-height: 77rpx;
  font-size: 32rpx;
}
.details_content {
  display: flex;
  flex-flow: column nowrap;
  height: 543rpx;
  padding: 30rpx 0;
  justify-content: space-between;
  word-wrap: break-word;
}
.divLine {
  height: 1rpx;
  background-color: #dddddd;
  width: 100%;
}
.details_content text {
  color: #666666;
}
.info_title text {
  color: #333333;
  font-size: 30rpx;
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
    <repeat for="{{buyerInfo.image}}" key="index" index="index" item="item">
      <swiper-item>
        <image src="{{item}}" mode="aspectFill"  bindtap="clickImage({{index}})" />
      </swiper-item>
    </repeat>
    </swiper>
    </view>
   <view class="details">
   <view class="details_title">{{buyerInfo.address+"提供"+buyerInfo.pig_type_name+buyerInfo.nums+"头"}}</view>
   <view class="divLine"></view>
   <view class="details_content">
       <view class="info_title"><text>信息详情</text></view>
       <text>地址：{{buyerInfo.address}}</text>
       <text>品种：{{buyerInfo.pig_type_name}}</text>
       <text>规格：{{buyerInfo.weight}}斤</text>
       <text>数量：{{buyerInfo.nums}}头</text>
        <text>价格：{{buyerInfo.price}}元/斤</text>
         <text>出栏时间：{{buyerInfo.out_time}}</text>
          <text>所属类型：{{buyerInfo.piggery_type}}</text>
   </view>
   </view>
    <view class="remark">
      <view class="remark_title">详情描述:</view>
     <repeat for="{{buyerInfo.remark}}" key="index" item="item" index="index">
     <view class="remark_item">
      <view wx:if="{{item[0]}}" class="remark_text">{{item[0]}}</view>
     <view wx:if="{{item[1]}}" ><image src="{{item[1]}}" class="remark_width" mode="aspectFill" @tap="clickImg({{index}})" /></view>
     <view wx:if="{{item[2]}}" ><video src="{{item[2]}}" class="remark_width" objectFit="cover" /></view>
     </view>
     </repeat>
   </view>
   <view class="details_phone">
     <view class="seller">小韩</view>
     <view class="seller_phone" @tap="userPhone"><image src="../../images/icon_dianhua@2x.png" /><text>电话</text></view>
   </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class SellerDetails extends wepy.page {
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
    buyerInfo: ""
  };

  computed = {};

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
  components = {};

  methods = {
    //图片预览
    clickImage(e) {
      wx.previewImage({
        current: this.buyerInfo.image[e],
        urls: this.buyerInfo.image,
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
        current: this.buyerInfo.remark[e][1],
        urls:this.buyerInfo.remark[e],
      });
    },
  };

  async getDetails() {
    const res = await shttp
      .get(`/api/v1/seller/info`)
      .query({
        id: this.id
      })
      .end();
    this.buyerInfo = res.data;
    this.buyerInfo.image=this.buyerInfo.image.split(",");
    console.log(this.buyerInfo);
    if (res.status === 0) {
      if (!this.buyerInfo) {
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

  //拨打电话
  userPhone() {
    wx.makePhoneCall({
      phoneNumber: "15926466855"
    });
  }
}
</script>

