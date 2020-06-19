<style  scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
}
.jobinfo{
    height:200rpx;
    width: 100%;
    box-sizing: border-box;
    padding: 28rpx;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    background-color: #ffffff;
     border-bottom: 1rpx solid #dddddd;
}
.jobinfo_top{
    display: flex;
    justify-content: space-between;
    align-items: center
}
.job_title{
    font-size: 32rpx;
}
.job_wage{
    font-size: 28rpx;
    color: #fc5a4f;
}
.firm{
    font-size: 30rpx;
}
.jobinfo_down{
    font-size: 28rpx;
    color: #666666;
}
.job_count{
    display: inline-block;
    width: 129rpx;
}

.job_area{
  float:right;
}
.intro,.describe{
background-color: #ffffff;
padding: 29rpx;
border-bottom: 1rpx solid #dddddd;
min-height: 368rpx;
}
.title{
    font-size: 32rpx;
    margin-bottom: 29rpx;
}
.content{
    font-size: 28rpx;
    text-indent: 20rpx;
}
.details_phone .seller{
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    width: 273rpx;
    padding: 18rpx 30rpx;
    font-size: 30rpx;
}
.details_phone .seller_phone{
    width: 476rpx;
}
</style>

<template>
  <view class="container">
   <view class="jobinfo" >
        <view class="jobinfo_top"><text class="job_title">{{info.job_name}}</text><text class="job_wage">{{info.salary}}元/月</text></view>
        <view class="firm">{{info.com_name}}</view>
        <view class="jobinfo_down"><text class="job_count">{{info.nums}}人</text><text class="job_exp">工作经验：{{info.exper}}年</text><text class="job_area">{{info.address}}</text></view>
    </view>
    <view class="intro">
       <view class="title">企业简介</view>
       <view class="content">{{info.com_introduce}}</view>
    </view>
    <view class="describe">
        <view class="title">职位描述</view>   
       <view class="content">{{info.job_desc}}</view>
    </view>

    <view class="details_phone">
     <view class="seller">
         <text>{{info.name}}</text>
     </view>
     <view class="seller_phone" @tap="userPhone"><image src="../../images/icon_dianhua@2x.png"  /><text>电话</text></view>
   </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class RecruitDetails extends wepy.page {
  config = {
    navigationBarTitleText: "详情"
  };
  data = {
      id:"",
      info:""
      
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
  };

  //获取详情
  async getDetails() {
    const res = await shttp
      .get(`/api/v1/company/info`)
      .query({
        id: this.id
      })
      .end();
    this.info = res.data;
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

  components = {};

  methods = {};
}
</script>
