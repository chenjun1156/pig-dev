<style  scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
  font-size: 32rpx;
  padding: 0 30rpx;

}
.phone{
    height: 160rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.consult{
    width:210rpx;
    height: 80rpx;
    font-size: 29rpx;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fc5a4f;
    border:1rpx solid #fc5a4f;
}
.wx{
    margin-bottom: 39rpx;
}

</style>

<template>
  <view class="container">
    <view class="phone"><text>电话：15527031319</text><button class="consult" @tap="userPhone()">立即咨询</button></view>
    <view class="wx">客服微信：15527031319</view>
    <view class="email">联系信息：15527031319</view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class Contcatus extends wepy.page {
  config = {
    navigationBarTitleText: "联系我们"
  };
  data = {
    info:{
        telephone:"15527031319",
    }
  };

  computed = {};

  components = {};

  methods = {};
  onShareAppMessage(res) {
    return {
      title: "链猪",
      path: "/src/pages/my/contcatus",
      success: function(res) {
        wx.navigateTo({
          url: "../home"
        });
        console.log("转发成功");
      },
      fail: function(res) {
        console.log("转发失败");
      }
    };
  }

  //拨打电话
  userPhone() {
    wx.makePhoneCall({
      phoneNumber: this.info.telephone
    });
  }
}
</script>
