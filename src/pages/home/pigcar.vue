<style  scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
}
.navbar {
  display: flex;
  background-color: #ffffff;
  height: 100rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
  align-items: flex-start;
}
.navbar_line {
  width: 1rpx;
  height: 70rpx;
  background-color: #dddddd;
  margin-top: 14rpx;
}
.navbar_item {
  width: 50%;
  height: 96rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 31rpx;
  color: #666666;
}
.on {
  border-bottom: 4rpx solid #fc5a4f;
  color: #fc5a4f;
}
.findgoods {
  height: 200rpx;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 1rpx solid #dddddd;
}
.findgoods_top {
  height: 100rpx;
  padding: 0 60rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32rpx;
}
.linkLine {
  width: 200rpx;
  border-bottom: 1rpx solid #dddddd;
  text-align: center;
  font-size: 26rpx;
}
.findgoods_down {
  height: 100rpx;
  font-size: 28rpx;
  padding: 0 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666666;
}

.classify {
  height: 90rpx;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: #666666;
  border-bottom: 1rpx solid #dddddd;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30rpx;
}
.classify .classify_item {
  height: 100%;
  width: 33.333%;
  font-size: 25rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drop_icon {
  height: 12rpx;
  width: 18rpx;
}

picker {
  width: 100%;
  display: flex;
  justify-content: center;
}
.picker {
  height: 90rpx;
  line-height: 90rpx;
  width: 230rpx;
  text-align: center;
}
.active {
  color: #fc5a4f;
}
</style>

<template>
  <view class="container">
    <!-- 搜索栏 -->
    <searchbox>
     <input slot="search" class="seek" placeholder="搜索地址" name="name"  value="{{name}}" bindinput="getName" confirm-type="search" bindconfirm="getResult"/>
      <button slot="sbtn" class="search_btn" bindtap="getResult">搜索</button>
    </searchbox>
 <!--二级导航栏-->
 <view class="navbar">
     <view class="navbar_item {{currentTab==0 ? 'on': ''}}" data-url="0" @tap="navbarTap">找货</view>
     <view class="navbar_line"></view>
     <view class="navbar_item {{currentTab==1 ? 'on': ''}}" data-url="1"  @tap="navbarTap">找车</view>
 </view>
 
<!-- 下拉框 -->
     <view class="classify">

            <view class="classify_item" @tap="clickTab" data-idx='1'>
              <picker mode="region"  bindchange="bindRegionChange" value="{{city}}"  bindcancel="cancel">
             <view class="picker {{navindex==1 ? 'active':''}}">
               {{ city[2] ?  (city[1]+city[2]) : "地区"}}
                <image class="drop_icon" src="{{ navindex==1 ? dropTab : drop}}" />
                </view>
            </picker>
            </view>

           <view class="classify_item" @tap="clickTab" data-idx='2'>
        <picker  bindchange="getCartype" value="{{index}}" range="{{car_type}}"  bindcancel="cancel">
            <view class="picker {{navindex==2 ? 'active':''}}"  >{{ listQuery.car_type ? car_type[listQuery.car_type-1]: "车型"}}
              <image class="drop_icon" src="{{ navindex==2 ? dropTab : drop}}" />
            </view>
            </picker>
            </view>

              <view class="classify_item" @tap="clickTab" data-idx='3'>
        <picker  bindchange="getPigcage" value="{{index}}" range="{{pig_cage}}"  bindcancel="cancel">
            <view class="picker {{navindex==3 ? 'active':''}}"  >{{ listQuery.pig_cage ? pig_cage[listQuery.pig_cage-1]: "猪笼"}}
              <image class="drop_icon" src="{{ navindex==3 ? dropTab : drop}}" />
            </view>
            </picker>
            </view>
              
     </view>

<!-- <view hidden="{{currentTab!=1}}">
  tab_02
   
</view>-->
<view class="section" hidden="{{currentTab!=0}}">
  <repeat for="{{newDriver}}" key="index" index="index" item="item">
<view class="findgoods" @tap="gotoTrucks({{item}})">
    <view class="findgoods_top">
    <text>{{item.address}}</text><text class="linkLine">{{item.send_time}}</text><text>{{item.destination}}</text>
    </view>
    <view class="findgoods_down">
        <text>车型：{{item.car_type}}</text>
        <text>猪笼：{{item.pig_cage}}</text>
        <text>当前所在地：{{item.address}}</text>
    </view>
</view>
</repeat>
</view>

<view class="section" hidden="{{currentTab!=1}}">
  <repeat for="{{newFind}}" key="index" index="index" item="item">
<view class="findgoods" @tap="getcar({{item}})">
    <view class="findgoods_top">
    <text>{{item.address}}</text><text class="linkLine">{{item.send_time}}</text><text>{{item.destination}}</text>
    </view>
    <view class="findgoods_down">
        <text>车型：{{item.car_type}}</text>
        <text>猪笼：{{item.pig_cage}}</text>
        <text>当前所在地：{{item.address}}</text>
    </view>
</view>
</repeat>
</view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import SearchBox from "../../components/searchbox"
export default class PigCar extends wepy.page {
  config = {
     enablePullDownRefresh: true,
    navigationBarTitleText: "猪车"
  };
  data = {
    currentTab: 0,
    navindex: null,
    findcarlist:[], //找车列表
    newFind:[],
    driverList:[], //找货列表
    newDriver:[],
    page:1,
    drop: "../../images/icon_xiala@2x.png",
    dropTab: "../../images/icon_xialax@2x.png",
     car_type: ["半挂","9.6","8.6","5.7","5.2","4.2","6.8","4.8","7.8"],
    pig_cage: ["单层","双层","三层","四层","五层"],
    city: [], //选择地区
    name: "",
    listQuery: {
      address: "",
      car_type: "",
      pig_cage: "",
      page: 1,
      limit: 10,
      name: ""
    },
  };

  computed = {};

  components = {
    searchbox:SearchBox,
  };

   onLoad(options) {
    //打开转发
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showLoading({
      title: "加载中"
    });
     if(this.currentTab==0){
        this.getDriver()
      }else{
         this.getFindcar()
      }
  }
   //重置样式
  resetCon() {
    this.listQuery.address = "";
    this.city = [];
    this.listQuery.car_type = "";
    this.listQuery.pig_cage = "";
    this.listQuery.page = 1;
    this.page=1;
    this.listQuery.name = "";
    this.findcarlist = [];
    this.driverList = [];
    this.newFind=[];
    this.newDriver=[];
  }

   //下标重置
  idxReset(){
    this.listQuery.page = 1;
    this.page=1;
    this.findcarlist = [];
    this.driverList = [];
    this.newFind=[];
    this.newDriver=[];
  }

  methods = {
     navbarTap(e){
      this.currentTab = e.currentTarget.dataset.url;
      this.resetCon();
      this.name = "";
      if(this.currentTab==0){
        this.getDriver()
      }else{
         this.getFindcar()
      }
      
    },
    getCartype: e => {
      this.listQuery.car_type = parseInt(e.detail.value) + 1;
      wx.showLoading({
        title: "加载中"
      });
          this.idxReset();
       if(this.currentTab==0){
        this.getDriver()
      }else{
         this.getFindcar();
      }
      this.navindex = null;
    },
    getPigcage: e => {
      this.listQuery.pig_cage = parseInt(e.detail.value) + 1;
      wx.showLoading({
        title: "加载中"
      });
       this.idxReset();
     if(this.currentTab==0){
        this.getDriver()
      }else{
         this.getFindcar()
      }
      this.navindex = null;
    },
     bindRegionChange: e => {
      this.city = e.detail.value;
      this.listQuery.address = this.city[1] + this.city[2];
      wx.showLoading({
        title: "加载中"
      });
      this.idxReset();
      if(this.currentTab==0){
        this.getDriver()
      }else{
         this.getFindcar()
      }
      this.navindex = null;
    },
     getResult: e => {
      this.resetCon();
      this.listQuery.name = this.name;
      wx.showLoading({
        title: "加载中"
      });
     if(this.currentTab==0){
        this.getDriver()
      }else{
         this.getFindcar()
      }
    },
    getName: e => (this.name = e.detail.value),
    clickTab: e => (this.navindex = e.currentTarget.dataset.idx),
    cancel: () => (this.navindex = null),
   
     gotoTrucks(data){
    wx.navigateTo({
      url:`../home/trucksDetails?id=${data.id}`
    })
  },
  getcar(data){
     wx.navigateTo({
      url:`../home/carDetails?id=${data.id}`
    })
  }
  };

  //获取找车列表
  async getFindcar() {
    for (let key in this.listQuery) {
      if (!this.listQuery[key]) {
        delete this.listQuery[key];
      }
    }
    const res = await shttp
      .get(`/api/v1/home/findcarlist`)
      .query(this.listQuery)
      .end();
    this.findcarlist = res.data;
    for(var i in this.findcarlist){
    this.newFind.push(this.findcarlist[i])
    }
    if (res.status === 0) {
      if (this.findcarlist.length == 0) {
        this.listQuery.page=this.page;
         setTimeout( () => {
          wx.showToast({
           title: '暂无更多数据',
            icon: "none",
        });
        setTimeout( () =>{
           wx.hideToast();  
        },2000)
      },0);
      }else{
        this.page=this.listQuery.page;
      }
      wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    this.$apply();
  }

  //获取找货列表
  async getDriver() {
    for (let key in this.listQuery) {
      if (!this.listQuery[key]) {
        delete this.listQuery[key];
      }
    }
    const res = await shttp
      .get(`/api/v1/driver`)
      .query(this.listQuery)
      .end();
    this.driverList = res.data;
     for(var i in this.driverList){
    this.newDriver.push(this.driverList[i])
    }
    if (res.status === 0) {
      if (this.driverList.length == 0) {
         this.listQuery.page=this.page;
         setTimeout( () => {
          wx.showToast({
           title: '暂无更多数据',
            icon: "none",
        });
        setTimeout( () =>{
           wx.hideToast();  
        },2000)
      },0);
      }else{
        this.page=this.listQuery.page;
      }
      wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    wx.stopPullDownRefresh();
    this.$apply();
  }

  //下拉刷新
  onPullDownRefresh() {
    this.resetCon();
    this.name = "";
    wx.showLoading({
      title: "加载中"
    });
     if(this.currentTab==0){
        this.getDriver()
      }else{
         this.getFindcar()
      }
  }
  //上拉加载更多
  onReachBottom() {
    this.page=this.listQuery.page;
    wx.showLoading({
      title: "玩命加载中"
    });
    this.listQuery.page = this.listQuery.page + 1;
    //获取商品
    if(this.currentTab==0){
        this.getDriver()
      }else{
         this.getFindcar()
      }
  }
 
}
</script>
