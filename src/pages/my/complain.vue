<style  scoped>
.container {
  background: #f4f4f4;
  padding: 30rpx;
  font-size: 28rpx;
  height: 100vh;
  box-sizing: border-box;
}
.row_box {
  height: 90rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.row_title {
 margin-bottom: 30rpx;
}
.row_control {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1rpx solid #cecece;
  border-radius: 15rpx;
  overflow: hidden;
  background-color: #ffffff;
  padding: 0 20rpx;
  color: #666666;
}

.row_control input {
  flex-grow: 1;
}

.submit {
  width: 690rpx;
  height: 90rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fc5a4f;
  font-size: 33rpx;
  color: #ffffff;
  position: fixed;
  bottom: 80rpx;
  /* margin-top:100rpx; */
}
.submit::after {
  border: none;
}

.section{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
}
.sec_title{
    width:100%
}
view.content{
    height:180rpx;
}
.content textarea{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20rpx;
}
</style>

<template>
  <view class="container">
   <form bindsubmit='submit'>
<view class="row_title">投诉建议</view>
 <view class="row_box content">
           <view class="row_control">
               <textarea name="content"  value="{{content}}" bindinput="getContent" maxlength="200" placeholder="请填写..."/>
           </view>
       </view>

       <view class="row_box">
           <view class="row_control">
               <input name="telephone"  value="{{telephone}}" bindinput="getPhone" placeholder="联系电话" /> 
           </view>
       </view>

        <view class="row_box">
           <view class="row_control">
               <input name="email"  value="{{email}}" bindinput="getEmail" placeholder="联系邮箱"/>
           </view>
       </view>

        <button class="submit" formType='submit' disabled="{{isBan}}">发布</button>
   </form>
</view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { uploadSeriesFile } from "../../utils/tencent-cos";
export default class Complain extends wepy.page {
  config = {
    navigationBarTitleText: "投诉建议"
  };
  data = {
    //意见
    content:"",
    //邮箱
    email: "",
    //联系电话
    telephone: "",
    //是否禁止提交按钮
    isBan: false,
    
  };

  onLoad(options) {
      this.getUserInfo()
  }

  computed = {};

  components = {};

  methods = {
    getContent: e => (this.content = e.detail.value),
    getEmail: e => (this.email = e.detail.value),
    getPhone: e => (this.telephone = e.detail.value),

    //提交表单
    submit(e) {
      let v = e.detail.value;
      var telephone = /^[1][0-9][0-9]{9}$/;
      var email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;



      if (!v.content) {
        return wx.showToast({
          title: "意见不能为空!",
          icon: "none",
          duration: 1000
        });
      }

      if (v.telephone === "" || !telephone.test(v.telephone)) {
        return wx.showToast({
          title: "手机号格式不正确!",
          icon: "none",
          duration: 1000
        });
      }
      if (v.email === "" || !email.test(v.email)) {
        return wx.showToast({
          title: "邮箱格式不正确!",
          icon: "none",
          duration: 1000
        });
      }
      this.isBan = true;
      wx.showLoading({
        title: "提交中"
      });
      this.postForm();
    }
  };

 
  //上传信息
  async postForm() {
    const res = await shttp
      .post(`/api/v1/member/complain`)
      .send({
        content: this.content,
        telephone: this.telephone,
        email: this.email,
      })
      .end();
    wx.hideLoading();
    if (res.status == 0) {
      wx.showToast({
        title: "提交成功",
        icon: "success",
        duration: 1000
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }
    else {
      wx.showToast({
        title: "提交失败",
        icon: "none",
        duration: 1000
      });
      this.isBan = false;
    }
    this.$apply();
  }

//验证信息
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
