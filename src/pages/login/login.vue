<style  scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
  display: -webkit-box;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-flex-flow: column nowrap;
  flex-flow: column nowrap;
  color: #999999;
}
.phone {
  height: 90rpx;
  width: 690rpx;
  border: 1rpx solid #cecece;
  border-radius: 15rpx;
  box-sizing: border-box;
  display:-webkit-box;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 20rpx;
  font-size: 28rpx;
  margin: 40rpx 0;
  background-color: #ffffff;
}
.phone input {
  width: 450rpx;
}
.phone button {
  height: 60rpx;
  width: 180rpx;
  border-radius: 10rpx;
  display: -webkit-box;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
 -webkit-align-items: center;
  align-items: center;
  font-size: 28rpx;
  color: #fc5a4f;
  padding: 0;
  margin: 0;
}
.phone button::after {
  border: 3rpx solid #fc5a4f;
}

.authcode {
  height: 90rpx;
  width: 690rpx;
  font-size: 28rpx;
  display:-webkit-box;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  align-items: center;
}
.code_box {
  width: 249rpx;
  height: 90rpx;
  line-height: 90rpx;
  box-sizing: border-box;
  display: -webkit-box;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 20rpx;
  border: 1rpx solid #cecece;
  border-radius: 15rpx;
  background-color: #ffffff;
}

.authcode text {
  width: 440rpx;
  color: #666666;
}
.submit {
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  background-color: #fc5a4f;
  color: #ffffff;
  font-size: 32rpx;
  margin-top: 100rpx;
}
.logo{
  text-align: center;
}
.logo image{
  height: 140rpx;
  width: 140rpx;
  margin: 190rpx 0;
}
</style>

<template>
  <view class="container">
    <view class="logo">
    <image  src="../../images/icon.png" />
    </view>
      <view class="phone">
          <input placeholder="请输入您的手机号"   bindinput='getPhoneValue' value='{{phone}}' type="number"/>
          <button bindtap='getVerificaitonCode' disabled='{{disabled}}' value="{{codename}}">{{codename}}</button>
      </view>
      <view class="authcode">
          <view class="code_box"><input  placeholder="请输入验证码" bindinput='getCodeValue' value='{{code}}'/></view>
          <text wx:if="{{istext}}">验证码已经发送，如您60秒内没有收到，请点击"重发验证码"</text>
      </view>

     <button class="submit" bindtap='save'>确定</button>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { getCode } from "../../utils/user-tools";
export default class Login extends wepy.page {
  config = {
    navigationBarTitleText: "登录"
  };
  data = {
    phone: "", //手机号
    code: "", //输入的验证码
    iscode: "", //获取到的验证码
    codename: "获取验证码",
    disabled: false, //是否禁止按钮
    istext: false,  //是否显示提示
  };
    onShow() {
    //这里判断是否获取了微信信息
    this.wxUserInfo = wx.getStorageSync("wxUserInfo") || null;
    if (!this.wxUserInfo) {
      wx.redirectTo({
        url: "/pages/authorization"
      });
    }
  }
  onLoad(options) {}

  computed = {};

  components = {};

  methods = {
    getPhoneValue: e => (this.phone = e.detail.value),
    getCodeValue: e => (this.code = e.detail.value),
    getVerificaitonCode() {
      this.disabled = true;
      this.check();
    }
  };

  //验证
  check() {
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.phone == "") {
      wx.showToast({
        title: "手机号不能为空",
        icon: "none",
        duration: 1000
      });
      this.disabled = false;
      return false;
    } else if (!myreg.test(this.phone)) {
      wx.showToast({
        title: "请输入正确的手机号",
        icon: "none",
        duration: 1000
      });
      this.disabled = false;
      return false;
    } else {
      this.getCode();
      var num = 61;
      var timer = setInterval(function() {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          _this.codename = "重新发送";
          _this.istext = false;
          _this.disabled = false;
          _this.$apply();
        } else {
          _this.istext = true;
          _this.codename = "正在发送(" + num + "s)";
          _this.$apply();
        }
      }, 1000);
    }
  }

  //提交
  save() {
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.phone == "") {
      wx.showToast({
        title: "手机号不能为空",
        icon: "none",
        duration: 1000
      });
      return false;
    } else if (!myreg.test(this.phone)) {
      wx.showToast({
        title: "请输入正确的手机号",
        icon: "none",
        duration: 1000
      });
      return false;
    }
    if (this.code == "") {
      wx.showToast({
        title: "验证码不能为空",
        icon: "none",
        duration: 1000
      });
      return false;
    } else {
      this.login();
    }
  }

  //验证码
  async getCode() {
    const res = await shttp
      .post(`/api/v1/home/sendmsg`)
      .send({
        member_telephone: this.phone
      })
      .end();
      if(!res.status==0){
          setTimeout(()=>{
            wx.showToast({
            title: "获取验证码失败,请稍后尝试",
            icon: "none",
            duration: 3000
      });
      this.istext=false;
      this.$apply();
    }, 5000)
    }
  }

  //登录
  async login() {
    let code = await getCode();
    var wxUserInfo = wx.getStorageSync("wxUserInfo");
    const res = await shttp
      .post(`/api/v1/member`)
      .send({
        member_telephone: this.phone,
        captcha: this.code,
        member_avatar: wxUserInfo.avatarUrl,
        member_nickname: wxUserInfo.nickName,
        code: code.code
      })
      .end();
    if (res.status == 0) {
      let auth = res.data.token;
      wx.setStorageSync("token", auth);
      wxUserInfo.phone = this.phone;
      wxUserInfo.id = res.data.member_id;
      wxUserInfo.type = res.data.member_type;
      wx.setStorageSync("wxUserInfo", wxUserInfo);
      wx.showToast({
        title: "登录成功!",
        icon: "success",
        duration: 1000
      });
       setTimeout(()=>{
        wx.switchTab({
        url: "/pages/home"
        });
       },2000)
    }
     else {
      wx.showToast({
        title: "输入验证码错误，登录失败",
        icon: "none",
        duration: 1000
      });
      this.code = "";
    }

    //获取用户资料存入本地缓存
    const memberRes = await shttp.get(`/api/v1/member/info`).end();
    let memberInfo = memberRes.data;
    wx.setStorageSync("memberInfo", memberInfo);
  }
}
</script>
