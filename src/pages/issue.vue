<style scoped>
.container{
  background-color: #f4f4f4;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30rpx 30rpx 0 30rpx;
  align-content: flex-start;
  box-sizing: border-box;
}
.issue_item{
  height: 335rpx;
  width: 330rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#ffffff;
  flex-flow: column nowrap;
  margin-bottom: 30rpx;
}

.issue_item image{
  height: 100rpx;
  width: 100rpx;
  margin-bottom: 27rpx;
}
.issue_item text{
  font-size: 36rpx;
  color: #222222;
}
</style>

<template>
  <view class="container">
    <repeat for="{{issue}}" index="index" key="index" item="item" >
    <navigator class="issue_item" url="./issuePage/{{item.url}}">
      <image src="{{item.image}}"/>
      <text>{{item.title}}</text>
    </navigator>
    </repeat>
   </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
export default class Issue extends wepy.page {
  config = {
    navigationBarTitleText: "发布"
  };
  data = {
    issue:[
      {title:"买猪",image:"../images/icon1_mai1@2x.png",url:"buyForm"},
      {title:"卖猪",image:"../images/icon1_mai2@2x.png",url:"sellForm"},
      {title:"猪车",image:"../images/icon1_zhuche@2x.png",url:"pigcarbar"},
      {title:"求职",image:"../images/icon1_qiuzhi@2x.png",url:"jobsForm"},
      {title:"招聘",image:"../images/icon1_qiuzhi@2x.png",url:"recruitForm"},
      {title:"猪场租售",image:"../images/icon1_zhuchang@2x.png",url:"rsForm"},
      ]
  };

  computed = {};

  components = {};

  methods = {};
  onShow(){
    this.getUserInfo();
  }

  async getUserInfo(){
    const res= await shttp
    .get(`/api/v1/member/info`).end();
    
    if(res.status!=0){
      wx.showToast({
          title: "信息已过期，请重新登录",
          icon: "none",
          duration: 2000
        });
      setTimeout(()=>{
            wx.redirectTo({
            url: "/pages/login/login"
            })
        }, 1000)
    }else{
    // this.userInfo=res.data;
    this.$apply();
  }
  }
  
}
</script>

