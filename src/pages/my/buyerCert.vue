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
}
.submit::after {
  border: none;
}

.section{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
}
</style>

<template>
  <view class="container">
   <form bindsubmit='submit'>
         <view class="row_box">
           <view class="row_control">
               <input name="name"  value="{{name}}" bindinput="getName" placeholder="姓名"/>
           </view>
       </view>
  <view class="section">
        <text>身份认证：上传身份证正反面两面照片</text>
            <view class="upload_content" @tap="testbtn()" data-index="1">
         <view class="icon_box"  hidden="{{front[0]}}">
          <view></view>
         <view></view>
        </view>
        <image src="{{front[0]}}"   mode="aspectFill"  />
        </view>

   <view class="upload_content" @tap="testbtn()" data-index="2">
         <view class="icon_box"  hidden="{{back[0]}}">
          <view></view>
         <view></view>
        </view>
        <image src="{{back[0]}}"  mode="aspectFill" />
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
import dateFormat from "dateformat";
import { uploadSeriesFile } from "../../utils/tencent-cos";
export default class buyerCert extends wepy.page {
  config = {
    navigationBarTitleText: "买家认证"
  };
  data = {
    //姓名
    name: "",
    //联系电话
    telephone: "",

    //是否禁止提交按钮
    isBan: false,
    //正面文件上传
    front:[],
    //反面文件上传
    back:[],
    
  };

  onLoad(options) {
      let typeId= wx.getStorageSync('memberInfo')
      console.log(typeId)
      if(typeId.member_type==1){
           wx.showToast({
        title: "您已认证买家，无需认证",
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
    getName: e => (this.name = e.detail.value),
    getPhone: e => (this.telephone = e.detail.value),

    //提交表单
    submit(e) {
      let v = e.detail.value;
      var telephone = /^[1][0-9][0-9]{9}$/;

      if (!v.name) {
        return wx.showToast({
          title: "姓名不能为空!",
          icon: "none",
          duration: 1000
        });
      }

       if (!this.front[0]||!this.back[0]) {
        return wx.showToast({
          title: "请上传图片!",
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

  testbtn(e) {
      let n = e.currentTarget.dataset.index;
    let that = this;
     console.log(n)
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
         console.log(n)
        that.upImg(tempFilePaths,n);
      }
    });
  }

  async upImg(imgurls,v) {
    //uploadSeriesFile 函数 传入的参数imgurls需为数组
    if(v==1){
        this.front = await uploadSeriesFile(imgurls);
    }else if (v==2){
        this.back = await uploadSeriesFile(imgurls);
    }
    wx.hideLoading();
    this.$apply();
  }

  //上传信息
  async postForm() {
    const res = await shttp
      .post(`/api/v1/buyer/cert`)
      .send({
        buyer_name: this.name,
        front_idcard: this.front[0],
        back_idcard: this.back[0],
        buyer_phone: this.telephone
      })
      .end();
    wx.hideLoading();
    if (res.status == 0) {
      wx.showToast({
        title: "认证买家成功",
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
        title: "认证买家失败",
        icon: "none",
        duration: 1000
      });
      this.isBan = false;
    }
    this.$apply();
  }

  
}
</script>
