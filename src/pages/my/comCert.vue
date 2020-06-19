<style  scoped>
.container {
  background: #f4f4f4;
  padding: 30rpx;
  font-size: 28rpx;
  height: 100vh;
}
.row_box {
  height: 90rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.row_title {
  display: flex;
  align-items: center;
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

/* 上传图片 */
.icon_box {
  width: 335rpx;
  height: 200rpx;
  background-color: #eeeeee;
  border: 1rpx solid #cecece;
  overflow: hidden;
  position: relative;
 
}
.icon_box view {
  height: 3rpx;
  width: 52rpx;
  background: #999999;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -1.5rpx;
  margin-left: -26rpx;
}
.icon_box view:first-of-type {
  transform: rotate(90deg);
}
.upload_content {
width: 335rpx;
  height: 200rpx;
  margin-top: 20rpx;
  margin-bottom:40rpx;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}
.upload_content image {
  width: 100%;
  height: 100%;
}
.upimg_wrap {
  width: 440rpx;
  display: flex;
  flex-flow: column nowrap;
}
.delHint {
  margin-left: 10rpx;
  color: #999999;
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
</style>

<template>
  <view class="container">
   <form bindsubmit='submit'>
         <view class="section">
        <text class="sec_title">请上传营业执照</text>
            <view class="upload_content" @tap="testbtn()" >
         <view class="icon_box"  hidden="{{business_img[0]}}">
          <view></view>
         <view></view>
        </view>
        <image src="{{business_img[0]}}"   mode="aspectFill"  />
        </view>
  </view>


 <view class="row_box">
           <view class="row_control">
               <input name="name"  value="{{name}}" bindinput="getName" placeholder="企业法人"/>
           </view>
       </view>

 <view class="row_box">
           <view class="row_control">
               <input name="address"  value="{{address}}" bindinput="getAddress" placeholder="企业办公地址"/>
           </view>
       </view>

        <view class="row_box">
           <view class="row_control">
               <input name="code"  value="{{code}}" bindinput="getCode" placeholder="企业信用代码"/>
           </view>
       </view>

       <view class="row_box">
           <view class="row_control">
               <input name="telephone"  value="{{telephone}}" bindinput="getPhone" placeholder="联系方式" /> 
           </view>
       </view>

        <!-- 上传图片 -->
        <button class="submit" formType='submit' disabled="{{isBan}}">发布</button>
   </form>
</view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { uploadSeriesFile } from "../../utils/tencent-cos";
export default class ComCert extends wepy.page {
  config = {
    navigationBarTitleText: "企业认证"
  };
  data = {
    //地址
    address:"",
    //企业信用代码
    code:"",
    //姓名
    name: "",
    //联系电话
    telephone: "",

    //是否禁止提交按钮
    isBan: false,
    //文件上传
    business_img:[],
  };

  onLoad(options) {
      let typeId= wx.getStorageSync('memberInfo')
      console.log(typeId)
      if(typeId.member_type==4){
           wx.showToast({
        title: "您已认证企业，无需认证",
        icon: "none",
        duration: 1000
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
      }
  }

  computed = {};

  components = {};

  methods = {
    getAddress: e => (this.address = e.detail.value),
    getCode: e => (this.code = e.detail.value),
    getName: e => (this.name = e.detail.value),
    getPhone: e => (this.telephone = e.detail.value),

    //提交表单
    submit(e) {
      let v = e.detail.value;
      var telephone = /^[1][0-9][0-9]{9}$/;

 if (!this.business_img[0]) {
        return wx.showToast({
          title: "请上传营业执照!",
          icon: "none",
          duration: 1000
        });
      }

      if (!v.name) {
        return wx.showToast({
          title: "企业法律人不能为空!",
          icon: "none",
          duration: 1000
        });
      }
       if (!v.address) {
        return wx.showToast({
          title: "企业办公地址不能为空!",
          icon: "none",
          duration: 1000
        });
      }

      if (!v.code) {
        return wx.showToast({
          title: "请填写企业信用代码!",
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
      this.isBan = true;
      wx.showLoading({
        title: "提交中"
      });
      this.postForm();
    }
  };

  testbtn() {
       let that = this;
    wx.chooseImage({
      count: 1, //一次上传图片数量,最多为9张
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: "上传图片中"
        });
         that.upImg(tempFilePaths);
      }
    });
  }

  async upImg(imgurls) {
    //uploadSeriesFile 函数 传入的参数imgurls需为数组
     this.business_img = await uploadSeriesFile(imgurls);
    wx.hideLoading();
    this.$apply();
  }

  //上传信息
  async postForm() {
    const res = await shttp
      .post(`/api/v1/company/cert`)
      .send({
          business_img:this.business_img[0],
        corporation: this.name,
        address:this.address,
        com_code:this.code,
        com_phone: this.telephone
      })
      .end();
    wx.hideLoading();
    if (res.status == 0) {
      wx.showToast({
        title: "认证企业成功",
        icon: "success",
        duration: 1000
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    } else if(res.error="您已实名认证"){
    wx.showToast({
        title: "您已实名认证",
        icon: "none",
        duration: 1000
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }
    else {
      wx.showToast({
        title: "认证企业失败",
        icon: "none",
        duration: 1000
      });
      this.isBan = false;
    }
    this.$apply();
  }


   
}
</script>
