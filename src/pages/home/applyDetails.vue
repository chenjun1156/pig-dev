<style  scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
}
.apply_info{
  height: 200rpx;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 30rpx;
  font-size: 25rpx;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  color: #666666;
  border-bottom: 1rpx solid #dddddd;
}
.apply_info .apply_title{
  font-size: 31rpx;
  color: #333333;
}
.apply_info>view{
  display: flex;
  justify-content: space-between;
}
.apply_wage{
   color: #fc5a4f;
}
.notes{
  background-color: #ffffff;
  min-height: 711rpx;
  padding: 29rpx 35rpx 29rpx 29rpx;
}
.notes_title{
   font-size: 31rpx;
   margin-bottom: 28rpx;
}
.notes_content{
  font-size: 25rpx;
  word-wrap: break-word;
}
</style>

<template>
  <view class="container">
    <view class="apply_info">
      <view><text class="apply_title">{{info.job_name}}</text><text class="apply_wage">{{info.salary}}元/月</text></view>
      <view><text class="apply_name">姓名：{{info.name}}</text><text class="apply_age">年龄：{{info.age}}岁</text></view>
      <view><text class="apply_exp">岗位工龄：{{info.exper}}年</text><text class="hope_area">希望工作地区：{{info.address}}</text></view>
    </view>
    <view class="notes">
      <text class="notes_title">备注</text>
      <text class="notes_content">
        {{info.info}}
      </text>
    </view>
   
   <!-- 联系电话 -->
   <view class="details_phone">
     <view class="seller">{{info.name}}</view>
     <view class="seller_phone" @tap="userPhone"><image src="../../images/icon_dianhua@2x.png" /><text>电话</text></view>
   </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class ApplyDetails extends wepy.page {
  config = {
    navigationBarTitleText: "详情"
  };
  data = {
    id: "",
    info: ""
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
      .get(`/api/v1/home/jobinfo`)
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

  computed = {};
 
  components = {};
 
  methods = {};
}
</script>
