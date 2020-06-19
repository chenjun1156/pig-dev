<style  scoped>
.container {
  background: #f4f4f4;
  min-height: 100%
}
.lzdetails_content{
    padding: 20rpx;
    font-size: 30rpx;
    color: #666666;
    word-wrap: break-word;
    text-indent: 1em;
}
</style>

<template>
  <view class="container">
        <view class="lzdetails_content">{{info.content}}</view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class PriceInfo extends wepy.page {
  config = {
    navigationBarTitleText: "详情"
  };
  data = {
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
      .get(`/api/v1/home/pigpriceinfo`)
      .query({
        id: this.id
      })
      .end();
    this.info = res.data;
    this.info.content=this.info.content.split("|")[0]
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
     
}
}
</script>
