<style scoped>
.container{
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30rpx 30rpx 0 30rpx;
  align-content: flex-start;
  
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
    <repeat for="{{cert}}" index="index" key="index" item="item" >
    <navigator class="issue_item" url="./{{item.url}}">
      <image src="{{item.image}}"/>
      <text>{{item.title}}</text>
    </navigator>
    </repeat>
   </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class Cert extends wepy.page {
  config = {
    navigationBarTitleText: "认证"
  };
  data = {
    cert:[
      {title:"买方认证",image:"../../images/icon5_maifang@2x.png",url:"buyerCert"},
      {title:"卖方认证",image:"../../images/icon5_maifang1@2x.png",url:"sellerCert"},
      {title:"司机认证",image:"../../images/icon5_qiye@2x.png",url:"driverCert"},
      {title:"企业认证",image:"../../images/icon5_siji@2x.png",url:"comCert"},
      ],
       //用户信息
    userInfo:"",
  };

  computed = {};

  components = {};

  methods = {};
  onShow(){
    this.getUserInfo()
  }

  onLoad(options) {
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
    this.userInfo=res.data;
    console.log(this.userInfo);
    if(this.userInfo){
     wx.setStorageSync("memberInfo", this.userInfo);
    }else{
       wx.showToast({
          title: "信息已失效，请重新登录",
          icon: "none",
          duration: 2000
        });
      setTimeout(()=>{
         wx.redirectTo({
             url: "/pages/login/login"
                 })
               }, 1000)
    }
    this.$apply();
  }
  }
  
}
</script>

