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

.rentsale{
  width: 420rpx;
  display: flex;
  justify-content: space-between;
}
.rentsale view{
    width: 180rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
   border: 1rpx solid #cecece;
  border-radius: 15rpx;
    background-color: #ffffff;
}
.rentsale .check{
    color: #ffffff;
    background-color: #fc5a4f;
}

.section{
  margin-bottom: 20rpx;
}
.section .banner{
  width: 100%;
  height: 100%;
}
.multi_row{
  margin-bottom: 20rpx;
}

</style>

<template>
  <view class="container">
   <form bindsubmit='submit'>

       <view class="row_box">
           <text class="row_title">租/售</text>
           <view class="rentsale">
               <repeat for="{{RentSaleList}}" index="index" key="index" item="item">
               <view class="{{index==nowindex ? 'check':''}}" @tap="getRentsale({{index}})">{{item.value}}</view>
               </repeat>
           </view>
       </view>

        <view class="row_box">
           <text class="row_title">规模</text>
           <view class="row_control">
               <picker class="row_sort" bindchange="getScale" value="{{index}}" range="{{classify.scale}}" >
                <view class="picker">{{classify.scale[scale-1]}}</view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

        <view class="row_box">
           <text class="row_title">猪场地址</text>
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
           <text class="row_title">建厂日期</text>
           <view class="row_control">
               <picker mode="date" value="{{time}}" start="2000-01-01" end="2028-01-01" bindchange="bindDateChange">
                <view class="picker">
                    {{time}}
                </view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>
       
        <view class="row_box">
           <text class="row_title">建筑面积</text>
           <view class="row_control">
               <input name="area"  value="{{area}}" bindinput="getArea"/>
           </view>
       </view>

         <view class="row_box">
           <text class="row_title">联系人</text>
           <view class="row_control">
               <input name="name"  value="{{name}}" bindinput="getName"/>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">联系电话</text>
           <view class="row_control">
               <input name="telephone"  value="{{telephone}}" bindinput="getPhone"/> 
           </view>
       </view>

       <view class="multi_row">
           <text class="row_title">具体描述</text>
       <view class="text_content">
           <textarea name="desc" value="{{desc}}" bindinput="getdesc"></textarea>
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
     <text class="row_title">详情视图</text>
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
import { uploadSeriesFile ,uploadFile} from "../../utils/tencent-cos";
export default class RsEdit extends wepy.page {
  config = {
    navigationBarTitleText: "修改猪场租售"
  };
  data = {
     
      RentSaleList:[
          {id:"1",value:"租",},
          {id:"2",value:"售",},
      ],
    //分类
    classify: {
      scale: ["母猪100头"," 母猪200头","母猪300头","母猪400头","母猪500头","母猪500头以上","育肥100头","育肥100-500头","育肥500-1000头","育肥1000-5000头","育肥5000-10000头","育肥10000头以上"],
    },
     //租售
     RentSale:"1",
     //规模
     scale:"",
    //选择地区
    city: [],
    //建厂日期
    time: "",
    //建筑面积
    area:"",
    //姓名
    name: "",
    //联系电话
    telephone: "",
    //具体描述
    desc:"",
    //添加段落
    remark: "",

    start: "",
    //是否禁止提交按钮
    isBan: false,
    uploadRes: null,
    //上传的图片列表
    imgList: [],
    nowindex:0,
     //段落详情
    content:"",
    itemList: [],
    infoImgList: [],
    infoVideoList: [],
    id:"", //详情id
    info:"",//详情信息
    address:"",
  };

  

  onLoad(options) {
    this.id=options.id;
    console.log("获取id值："+this.id)
    this.getDetails();
    //日期选择开始时间
    // this.start = dateFormat(new Date(), "yyyy-MM-dd");
    // console.log(this.start);
  }

  computed = {};

  components = {};

  methods = {
      getRentsale(n){
          this.nowindex=n;
          this.RentSale=this.RentSaleList[n].id;
          console.log(this.RentSale)
      },
    bindRegionChange: e => (this.city = e.detail.value,this.address=this.city[1] + this.city[2]),
    bindDateChange: e => (this.time = e.detail.value),
    getScale: e => (this.scale = parseInt(e.detail.value) + 1),
    getArea: e => (this.area = e.detail.value),
    getName: e => (this.name = e.detail.value),
    getPhone: e => (this.telephone = e.detail.value),
    getdesc: e => (this.desc = e.detail.value),
   

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
      
      if (!this.scale) {
        return wx.showToast({
          title: "请选择规模!",
          icon: "none",
          duration: 1000
        });
      }
      
      if (!this.address) {
        return wx.showToast({
          title: "请选择猪场地址!",
          icon: "none",
          duration: 1000
        });
      }
         if (!this.time) {
        return wx.showToast({
          title: "建厂日期不能为空!",
          icon: "none",
          duration: 1000
        });
      }
      if (!this.area) {
        return wx.showToast({
          title: "建筑面积不能为空!",
          icon: "none",
          duration: 1000
        });
      }


      if (!this.name) {
        return wx.showToast({
          title: "联系人不能为空!",
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
       if (!this.desc) {
        return wx.showToast({
          title: "具体描述不能为空!",
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

      
          if (!this.remark) {
        return wx.showToast({
          title: "请上传详情视图",
          icon: "none",
          duration: 1000
        });
      }

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
      .get(`/api/v1/home/piggeryleaseinfo`)
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
        for(var i  in this.classify.scale){
          if(this.classify.scale[i]==this.info.scale){
              this.scale=parseInt(i)+1;
          }
        };
        this.RentSale=this.info.type;
        this.nowindex=parseInt(this.info.type)-1;
        this.address=this.info.address;
        this.time=this.info.b_ctime;
        this.area=this.info.area;
        this.name=this.info.name;
        this.telephone=this.info.telephone;
        this.desc=this.info.desc;
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
      .put(`/api/v1/member/editpiggerylease`)
      .send({
        type:this.RentSale,
        scale:this.scale,
        address: this.address,
        b_ctime: this.time,
        area:this.area,
        name: this.name,
        telephone: this.telephone,
        desc: this.desc,
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
    }else {
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
