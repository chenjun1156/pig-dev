<style  scoped>
.container {
  background: #f4f4f4;
  padding: 30rpx;
  font-size: 28rpx;
}
.row_box {
  width: 100%;
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
  width: 380rpx;
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
picker {
  /* display: block; */
  width: 100%;
  height: 100%;
  position: relative;
}
.icon_down {
  width: 18rpx;
  height: 10rpx;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -5rpx;
}
.picker {
  height: 90rpx;
  width: 350rpx;
  line-height: 90rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text_content {
  background: #ffffff;
  height: 150rpx;
  width: 100%;
  border: 1rpx solid #cecece;
  border-radius: 15rpx;
  overflow: hidden;
  flex-grow: 1;
  box-sizing: border-box;
  margin-top: 20rpx;
}
.text_content textarea {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15rpx;
  overflow-y: auto;
}
/* 上传图片 */
.icon_box {
  width: 230rpx;
  height: 220rpx;
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
  width: 230rpx;
  height: 220rpx;
  margin-top: 20rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}
.upload_content image {
  width: 120rpx;
  height: 100rpx;
  background: #ffffff;
  margin: 5rpx;
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
  margin-top: 90rpx;
  color: #ffffff;
}
.submit::after {
  border: none;
}

.text_right {
  text-align: right;
}

.text_box {
  display: inline-block;
  width: 80rpx;
  text-align: right;
}

.section {
  margin-bottom: 20rpx;
}
.section .banner {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <view class="container">
   <form bindsubmit='submit'>

        <view class="row_box">
           <text class="row_title">请选择所在地区</text>
           <view class="row_control">
               <picker mode="region"  bindchange="bindRegionChange" value="{{city}}"  >
             <view class="picker">
              {{city[1]}}{{city[2]}}
                </view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

        <view class="row_box">
           <text class="row_title">请选择车型</text>
           <view class="row_control">
               <picker class="row_sort" bindchange="getCartype" value="{{index}}" range="{{classify.car_type}}" >
                <view class="picker">{{classify.car_type[carType-1]}}</view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">请选在猪笼型号</text>
           <view class="row_control">
               <picker class="row_sort" bindchange="getPigcage" value="{{index}}" range="{{classify.pig_cage}}" >
                <view class="picker">{{classify.pig_cage[pigCage-1]}}</view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">请选择计划目的地</text>
           <view class="row_control">
               <picker mode="region"  bindchange="getDestination" value="{{destination}}"  >
             <view class="picker">
              {{destination[1]}} {{destination[2]}}
                </view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">请选择可前往地区</text>
           <view class="row_control">
               <picker mode="region"  bindchange="getAddrs" value="{{addrsList}}" custom-item='不限'>
             <view class="picker">
              {{addrs}}
                </view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

        <view class="row_box">
           <text class="row_title">发车时间</text>
           <view class="row_control">
               <picker mode="date" value="{{time}}" start="{{start}}" end="2028-01-01" bindchange="bindDateChange">
                <view class="picker">
                    {{time}}
                </view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

         <view class="row_box">
           <text class="row_title">姓名</text>
           <view class="row_control">
               <input name="name"  value="{{name}}" bindinput="getName"/>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">您的联系电话</text>
           <view class="row_control">
               <input name="telephone"  value="{{telephone}}" bindinput="getPhone"/> 
           </view>
       </view>

         <view class="row_box" style="height:180rpx; flex-flow: column nowrap;">
           <text class="row_title">详情内容</text>
           <view class=" text_content">
               <textarea  name="content"  value="{{content}}" bindinput="getRemark" maxlength="500"></textarea>
           </view>
       </view>

        <!-- 上传图片 -->
           <view class="section">
        <text>上传头图</text>
          <view class="upload_content banner">
         <view class="icon_box" @tap="testbtn">
          <view></view>
         <view></view>
        </view>
         <view class="upimg_wrap">
         <viwe>
        <repeat for="{{imgList}}" wx:if="{{imgList.length!=0}}" index="index" key="index" item="item">
        <image src="{{item}}" style="width:120rpx; height:100rpx"  mode="aspectFit" bindtap="clickImage({{index}})" bindlongpress="deleteImage({{index}})" />
        </repeat>
        </viwe>
         <text class="delHint" wx:if="{{imgList[0]}}">(长按图片删除)</text>
  </view>
  </view>
  </view>

  <view>
  <button class="addsection" @tap="updetail_img">上传图片</button>
  <button class="addsection" @tap="upvideo" >上传视频</button>
</view>
 <view class="upload_box">
    <repeat for="{{itemList}}" key="index" item="item" index="index">
        <view wx:if="{{item.image}}" class="img_box" >
           <image class="detail_img"  src="{{item.image}}" mode="aspectFit"/>
          <image class="del_img"  src="../../images/shanchu.png" @tap="delImg({{index}})" />
        </view>
        <view wx:if="{{item.video}}" class="img_box video_box" >
           <video id="prew_video"  class="detail_img" src="{{item.video}}" objectFit="fill"></video>
          <image class="del_img"  src="../../images/shanchu.png" @tap="delVideo({{index}})" />
        </view>
       </repeat>
</view>

        <button class="submit" formType='submit' disabled="{{isBan}}">发布</button>
   </form>
</view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import dateFormat from "dateformat";
import { uploadSeriesFile, uploadFile } from "../../utils/tencent-cos";
export default class FindDriver extends wepy.page {
  config = {
    navigationBarTitleText: "找货发布"
  };
  data = {
    //分类
    classify: {
      car_type: ["半挂","9.6","8.6","5.7","5.2","4.2","6.8","4.8","7.8"],
      pig_cage: ["单层", "双层", "三层", "四层", "五层"]
    },
    //所在地区
    city: [],
    //计划目的地
    destination: [],
    //可前往地区
    addrsList: [],
    addrs:"",
    //发车时间
    time: "",
    //车型
    carType: "",
    //猪笼类型
    pigCage: "",
    //姓名
    name: "",
    //联系电话
    telephone: "",
    //备注
    remark: "",
    start: "",
    //是否禁止提交按钮
    isBan: false,
    //文件上传
    uploadRes: null,
    //上传的图片列表
    imgList: [],
    member_type: "",
    //段落详情
    content: "",
    itemList: [],
    infoImgList: [],
    infoVideoList: []
  };
  onShow(){
    this.member_type=wx.getStorageSync('memberInfo').member_type;
     console.log(this.member_type)
      if(this.member_type!=3){
           wx.showToast({
        title: "您不是司机,无法发布找货",
        icon: "none",
        duration: 1000
      });
      setTimeout(() => {
        wx.redirectTo({
       url: '/pages/my/cert',
      });
      }, 1000);
      }

  }
  onLoad(options) {
    //日期选择开始时间
    this.start = this.getNowFormatDate();
    console.log(this.start);
  }
  //获取当前时间，格式YYYY-MM-DD
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }

  computed = {};

  components = {};

  methods = {
    bindRegionChange: e => (this.city = e.detail.value),
    bindDateChange: e => (this.time = e.detail.value),
    getCartype: e => (this.carType = parseInt(e.detail.value) + 1),
    getPigcage: e => (this.pigCage = parseInt(e.detail.value) + 1),
    getDestination: e => (this.destination = e.detail.value),
    getAddrs: e => {
       this.addrsList = e.detail.value;
      // console.log(this.city)
      if(this.addrsList[0]=="不限"){
        this.addrs="不限"
      }
      else if(this.addrsList[1]=="不限"){
        this.addrs=this.addrsList[0]
      }else if(this.addrsList[2]=="不限"){
          this.addrs=this.addrsList[1]
      }
      else{
        this.addrs=this.addrsList[1]+this.addrsList[2];
      }
    },
    getName: e => (this.name = e.detail.value),
    getPhone: e => (this.telephone = e.detail.value),
    getRemark: e => {
      this.content = e.detail.value;
      var section = {
        text: "",
        image: "",
        video: ""
      };
      if (!this.itemList[0]) {
        this.itemList.push(section);
      }
      this.itemList[0].text = this.content;
      console.log(this.itemList);
    },
    //图片预览
    clickImage(e) {
      wx.previewImage({
        current: this.imgList[e],
        urls: this.imgList,
        fail: function() {
          console.log("fail");
        },
        complete: function() {
          console.info("点击图片了");
        }
      });
    },

    //图片删除
    deleteImage(index) {
      var that = this;

      wx.showModal({
        title: "提示",
        content: "确定要删除此图片吗？",
        success: function(res) {
          if (res.confirm) {
            console.log("点击确定了");
            that.imgList.splice(index, 1);
            that.$apply();
          } else if (res.cancel) {
            console.log("点击取消了");
            return false;
          }
        }
      });
    },

    //提交表单
    submit(e) {
      let v = e.detail.value;
      var telephone = /^[1][0-9][0-9]{9}$/;

      if (!this.city.length > 0) {
        return wx.showToast({
          title: "请选择所在地区!",
          icon: "none",
          duration: 1000
        });
      }

      if (!this.carType) {
        return wx.showToast({
          title: "请选择车型!",
          icon: "none",
          duration: 1000
        });
      }

      if (!this.pigCage) {
        return wx.showToast({
          title: "请选择猪笼型号!",
          icon: "none",
          duration: 1000
        });
      }

      if (!this.destination.length > 0) {
        return wx.showToast({
          title: "请选择计划目的地!",
          icon: "none",
          duration: 1000
        });
      }

      if (!this.addrs.length > 0) {
        return wx.showToast({
          title: "请选择可前往地区!",
          icon: "none",
          duration: 1000
        });
      }

      if (!this.time) {
        return wx.showToast({
          title: "发车时间不能为空!",
          icon: "none",
          duration: 1000
        });
      }

      if (!v.name) {
        return wx.showToast({
          title: "姓名不能为空!",
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

      if (!v.content) {
        return wx.showToast({
          title: "描述详情不能为空!",
          icon: "none",
          duration: 1000
        });
      }
      if (!this.imgList[0]) {
        return wx.showToast({
          title: "请上传图片!",
          icon: "none",
          duration: 1000
        });
      }

      //处理段落
      for (var i in this.itemList) {
        this.itemList[i] = Object.values(this.itemList[i]);
      }
      this.remark = this.itemList.join("|");
      console.log(this.remark);

      this.isBan = true;
      wx.showLoading({
        title: "提交中"
      });
      this.postForm();
    },
    testbtn() {
      let that = this;
      var num = 3 - this.imgList.length;
      if (num > 0) {
        wx.chooseImage({
          count: num, //一次上传图片数量,最多为9张
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
      } else {
        wx.showToast({
          title: "最多上传3张图片",
          icon: "none",
          duration: 1000
        });
        return false;
      }
    },
    //上传详情图片
    updetail_img() {
      let that = this;
      var num = 9 - this.infoImgList.length;
      if (num > 0) {
        wx.chooseImage({
          count: num, // 最多可以选择的图片张数，默认9
          sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res) {
            const tempFilePaths = res.tempFilePaths;
            wx.showLoading({
              title: "上传图片中"
            });
            that.updetail(tempFilePaths);
          }
        });
      } else {
        wx.showToast({
          title: "最多上传9张图片",
          icon: "none",
          duration: 1000
        });
        return false;
      }
    },
    //上传视频
    upvideo() {
      let that = this;
      if (this.infoVideoList.length > 9) {
        return wx.showToast({
          title: "最多上传9个视频",
          icon: "none",
          duration: 1000
        });
      }
      wx.chooseVideo({
        sourceType: ["album", "camera"], // album 从相册选视频，camera 使用相机拍摄
        maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
        camera: ["front", "back"],
        success: function(res) {
          // console.log(res)
          const tempFilePath = res.tempFilePath;
          wx.showLoading({
            title: "上传视频中"
          });
          that.upVideo(tempFilePath);
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    },
    //删除详情图片
    delImg(idx) {
      this.itemList[idx].image = "";
      this.infoImgList.splice(idx,1)
    },

    //删除视频
    delVideo(idx) {
      this.itemList[idx].video = "";
      this.infoVideoList.splice(idx,1)
    }
    
  };

  async upImg(imgurls) {
    //uploadSeriesFile 函数 传入的参数imgurls需为数组
    this.uploadRes = await uploadSeriesFile(imgurls);
    console.log(this.uploadRes);
    this.imgList = this.imgList.concat(this.uploadRes);
    wx.hideLoading();
    this.$apply();
  }

  //上传详情
  async updetail(imgurls) {
    this.uploadRes = await uploadSeriesFile(imgurls);
    this.infoImgList.push(...this.uploadRes);
    for (var i in this.infoImgList) {
      var section = {
        text: "",
        image: "",
        video: ""
      };
      if (!this.itemList[i]) {
        this.itemList.push(section);
      }
      this.itemList[i].image = this.infoImgList[i];
    }
    console.log(this.itemList);
    wx.hideLoading();
    this.$apply();
  }

  //上传视频
  async upVideo(videourl) {
    this.uploadRes = await uploadFile(videourl);
    this.infoVideoList.push(this.uploadRes);
    for (var i in this.infoVideoList) {
      var section = {
        text: "",
        image: "",
        video: ""
      };
      if (!this.itemList[i]) {
        this.itemList.push(section);
      }
      this.itemList[i].video = this.infoVideoList[i];
    }
    console.log(this.itemList);
    wx.hideLoading();
    this.$apply();
  }
  //上传信息
  async postForm() {
    const res = await shttp
      .post(`/api/v1/driver`)
      .send({
        address: this.city[1] + this.city[2],
        car_type: this.carType,
        pig_cage: this.pigCage,
        destination: this.destination[1] + this.destination[2],
        addrs: this.addrs,
        send_time: this.time,
        name: this.name,
        telephone: this.telephone,
        remark: this.remark,
        image: this.imgList.join(",")
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
    // else if(res.error == "您不是司机,无法发布找货"){
    //     wx.showToast({
    //     title: "您不是司机,无法发布找货",
    //     icon: "none",
    //     duration: 1000
    //   });
    //   setTimeout(() => {
    //     wx.navigateBack();
    //   }, 1000);
    // }
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
}
</script>
