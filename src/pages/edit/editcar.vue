<style  scoped>
.container {
  background: #f4f4f4;
  padding: 30rpx;
  font-size: 28rpx;
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

.row_control input{
  flex-grow:1
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
.delHint{
  margin-left: 10rpx;
  color: #999999
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
.line{
    width:100%;
    height: 2rpx;
    background-color: #dddddd;
    margin-bottom: 20rpx;
}

.section{
  margin-bottom: 20rpx;
}
.section .banner{
  width: 100%;
  height: 100%;
}
</style>

<template>
  <view class="container">
   <form bindsubmit='submit'>

       <view class="row_box">
           <text class="row_title">请选择猪的种类</text>
           <view class="row_control">
               <picker class="row_sort" bindchange="getKind" value="{{index}}" range="{{classify.pig_type}}" >
                <view class="picker">{{classify.pig_type[pigClass-1]}}</view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">数量</text>
           <view class="row_control">
               <input  name="nums" value="{{nums}}" bindinput="getNum" /><text>头</text>
           </view>
       </view>
        <view class="row_box">
           <text class="row_title">均重</text>
           <view class="row_control">
               <input  name="weight" value="{{weight}}" bindinput="getWeight" /><text>斤</text>
           </view>
       </view>
        <view class="row_box">
           <text class="row_title">总重吨位</text>
           <view class="row_control">
               <input  name="totalWeight" value="{{totalWeight}}" bindinput="getTotalWeight" /><text>吨</text>
           </view>
       </view>
        <view class="line"></view>
        <view class="row_box">
           <text class="row_title">请选择所在地区</text>
           <view class="row_control">
               <picker mode="region"  bindchange="bindRegionChange" value="{{city}}" >
             <view class="picker">
              {{address}}
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
               <picker mode="region"  bindchange="getDestination" value="{{destination}}" >
             <view class="picker">
              {{plan}}
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
        <text>上传图片</text>
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
  
        <button class="submit" formType='submit' disabled="{{isBan}}">保存修改</button>
   </form>
</view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import { uploadSeriesFile,uploadFile} from "../../utils/tencent-cos";
export default class EditCar extends wepy.page {
  config = {
    navigationBarTitleText: "修改找车"
  };
  data = {
    //分类
    classify: {
       pig_type: ["外三元","内三元","良杂猪","土杂猪","土猪","二元仔猪","三元仔猪","土杂仔猪","大约克种猪","长白种猪","长大二元种猪","皮特兰种猪","汉普夏种猪"],
      car_type: ["半挂","9.6","8.6","5.7","5.2","4.2","6.8","4.8","7.8"],
      pig_cage: ["单层","双层","三层","四层","五层"],
    },
    //猪的种类
    pigClass: "",
    //数量
    nums: "",
    //均重
    weight:"",
    //总重吨位
    totalWeight:"",
    //所在地区
    city: [],
    //地区
    address:"",
    //计划目的地
    destination: [],
    //计划
    plan:"",
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
    //段落详情
    content:"",
      itemList: [],
    infoImgList: [],
    infoVideoList: [],
    id:"", //详情id
    info:"",//详情信息
  };

  onLoad(options) {
     this.id=options.id;
    console.log("获取id值："+this.id)
    this.getDetails();
    //日期选择开始时间
    this.start = this.getNowFormatDate();
    console.log(this.start);
  }

  computed = {};

  components = {};

  methods = {
      getKind: e => (this.pigClass = parseInt(e.detail.value) + 1),
      getNum: e => (this.nums = e.detail.value),
      getWeight: e => (this.weight = e.detail.value),
      getTotalWeight: e => (this.totalWeight = e.detail.value),
    bindRegionChange: e => (this.city = e.detail.value,this.address=this.city[1] + this.city[2]),
    bindDateChange: e => (this.time = e.detail.value),
    getCartype: e => (this.carType = parseInt(e.detail.value) + 1),
    getPigcage: e => (this.pigCage = parseInt(e.detail.value) + 1),
     getDestination: e => (this.destination = e.detail.value,this.plan=this.destination[1] + this.destination[2]),
    getName: e => (this.name = e.detail.value),
    getPhone: e => (this.telephone = e.detail.value),
    getRemark: (e) => {
      this.content=e.detail.value;
       var section = {
        text: "",
        image: "",
        video: ""
      };
      if (!this.itemList[0]) {
        this.itemList.push(section);
      }
      this.itemList[0].text = this.content
      console.log(this.itemList)
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
      deleteImage (index) {
        var that = this;

       wx.showModal({
       title: '提示',
       content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
      console.log('点击确定了');
      that.imgList.splice(index, 1);
      that.$apply();
     } else if (res.cancel) {
      console.log('点击取消了');
      return false;    
     }
   }
  })
 },

    //提交表单
    submit(e) {
      let v = e.detail.value;
      var telephone = /^[1][0-9][0-9]{9}$/;

      if (!this.pigClass) {
        return wx.showToast({
          title: "请选择猪的种类!",
          icon: "none",
          duration: 1000
        });
      }

      if (!this.nums) {
        return wx.showToast({
          title: "数量不能为空!",
          icon: "none",
          duration: 1000
        });
      }
      
      if (!this.weight) {
        return wx.showToast({
          title: "均重不能为空!",
          icon: "none",
          duration: 1000
        });
      }
      
      if (!this.totalWeight) {
        return wx.showToast({
          title: "总重吨位不能为空!",
          icon: "none",
          duration: 1000
        });
      }
     
      if (!this.address) {
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
       

      if (!this.plan) {
        return wx.showToast({
          title: "请选择计划目的地!",
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

      if (!this.name) {
        return wx.showToast({
          title: "姓名不能为空!",
          icon: "none",
          duration: 1000
        });
      }

      if (this.telephone === "" || !telephone.test(this.telephone)) {
        return wx.showToast({
          title: "手机号格式不正确!",
          icon: "none",
          duration: 1000
        });
      }
       if(!this.content){
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
      for(var i in this.itemList){
        this.itemList[i]=Object.values(this.itemList[i])
      }
      this.remark=this.itemList.join("|")
      console.log(this.remark);

      
       

       this.isBan = true;
      wx.showLoading({
        title: "提交中"
        });
      this.postForm();
    },
     testbtn() {
    let that = this;
    var num = 3-(this.imgList.length);
    if(num>0){
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
    }else{
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
  //获取信息
 async getDetails() {
    const res = await shttp
      .get(`/api/v1/home/findcarinfo`)
      .query({
        id: this.id
      })
      .end();
    if (res.status === 0) {
      if (!res.data) {
        wx.showToast({
          title: "暂无数据",
          icon: "none",
          duration: 1000
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
      //数据处理显示
       this.info = res.data;
        this.info.image=this.info.image.split(",");
         this.pigClass=this.info.pig_type;
        this.address=this.info.address;
        this.weight=this.info.weight;
        this.totalWeight=this.info.total_weight;
        this.nums=this.info.nums;
        this.price=this.info.price;
        this.plan=this.info.destination;
        this.time=this.info.send_time;
        this.suchTime=this.info.buy_time;
        for(var i  in this.classify.piggery_type){
          if(this.classify.piggery_type[i]==this.info.piggery_type){
              this.piggeryType=parseInt(i)+1;
          }
        };
        for(var i  in this.classify.car_type){
          if(this.classify.car_type[i]==this.info.car_type){
              this.carType=parseInt(i)+1;
          }
        };
        for(var i  in this.classify.pig_cage){
          if(this.classify.pig_cage[i]==this.info.pig_cage){
              this.pigCage=parseInt(i)+1;
          }
        };

        this.name=this.info.name;
        this.telephone=this.info.telephone;
        if(this.info.remark){
          for(var i in this.info.remark){
             var temp={
               text:"",
               image:"",
               video:"",
              }
                temp.text=this.info.remark[i][0];
                temp.image=this.info.remark[i][1];
                temp.video=this.info.remark[i][2];
                this.itemList.push(temp)
                if(this.info.remark[i][1]){
                this.infoImgList.push(this.info.remark[i][1])
                }
                if(this.info.remark[i][2]){
                this.infoVideoList.push(this.info.remark[i][2])
                }
          }
          this.content=this.itemList[0].text;
          console.log(this.infoImgList,this.infoVideoList)
        }
        this.imgList=this.info.image;
        wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    this.$apply();
  }
  //上传信息
  async postForm() {
    const res = await shttp
      .put(`/api/v1/member/editfindcar`)
      .send({
        pig_type:this.pigClass,
        weight:this.weight,
        nums:this.nums,
        total_weight:this.totalWeight,
        address: this.address,
        car_type:this.carType,
        pig_cage:this.pigCage,
        destination:this.plan,
        send_time:this.time,
        name: this.name,
        telephone: this.telephone,
        remark: this.remark,
       image: this.imgList.join(","),
       id:this.id
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
}
</script>
