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
  font-size: 32rpx
}
.details_content {
  display: flex;
  flex-flow: column nowrap;
  /* height: 543rpx; */
  padding-top: 30rpx;
  box-sizing: border-box;
  word-wrap: break-word;
}
.details_content > text {
  margin-bottom: 30rpx;
}
.divLine {
  height: 1px;
  background-color: #dddddd;
  width: 100%;
}
.details_content text {
  color: #666666;
}
.details_content .info_title {
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
    <repeat for="{{info.image}}" key="index" index="index" item="item">
      <swiper-item>
        <image src="{{item}}" mode="aspectFill"  bindtap="clickImage({{index}})" />
      </swiper-item>
    </repeat>
    </swiper>
    </view>
   <view class="details">
   <view class="details_title">货物</view>
   <view class="divLine"></view>
   <view class="details_content">
       <text class="info_title">货物信息</text>
       <text>品种：{{pig_type[info.pig_type-1]}}</text>
       <text>数量：{{info.nums}}头</text>
       <text>均重：{{info.weight}}斤</text>
       <text>总重吨位：{{info.total_weight}}吨</text>
       <text class="divLine"></text>
       <text class="info_title">所需车辆信息</text>
       <text>车型：{{info.car_type}}</text>
       <text>猪笼：{{info.pig_cage}}</text>
       <text>当前所在地：{{info.address}}</text>
       <text>目的地：{{info.destination}}</text>
   </view>
   </view>
   <view class="remark">
      <view class="remark_title">详情描述:</view>
     <repeat for="{{info.remark}}" key="index" item="item" index="index">
     <view class="remark_item">
      <view wx:if="{{item[0]}}" class="remark_text">{{item[0]}}</view>
     <view wx:if="{{item[1]}}" ><image src="{{item[1]}}" class="remark_width" mode="aspectFill" @tap="clickImg({{index}})" /></view>
     <view wx:if="{{item[2]}}" ><video src="{{item[2]}}" class="remark_width" objectFit="cover" /></view>
     </view>
     </repeat>
   </view>
   <view class="details_phone">
     <view class="seller">{{info.name}}</view>
     <view class="seller_phone" @tap="userPhone"><image src="../../images/icon_dianhua@2x.png"></image><text>电话</text></view>
   </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class CarDetails extends wepy.page {
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
     pig_type: ["外三元","内三元","良杂猪","土杂猪","土猪","二元仔猪","三元仔猪","土杂仔猪","大约克种猪","长白种猪","长大二元种猪","皮特兰种猪","汉普夏种猪"],

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
      .get(`/api/v1/home/findcarinfo`)
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

  //拨打电话
  userPhone() {
    wx.makePhoneCall({
      phoneNumber: this.info.telephone
    });
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
  }
}
</script>

