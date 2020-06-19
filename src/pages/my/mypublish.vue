<style  scoped>
.container {
  background: #f4f4f4;
  min-height: 100%;
  padding-bottom: 20rpx;
}
.navbar {
  display: flex;
  background-color: #ffffff;
  height: 100rpx;
  box-sizing: border-box;
  align-items: flex-start;
}
.navbar_line {
  width: 1px;
  height: 60rpx;
  background-color: #dddddd;
  margin-top: 22rpx;
}
.navbar_item {
  width: 16.6666%;
  height: 96rpx;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 31rpx;
  color: #666666;
}
.on {
  border-bottom: 4rpx solid #fc5a4f;
  color: #fc5a4f;
}

.analyze_data navigator {
  height: 240rpx;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #dddddd;
}
.analyze_data image {
  width: 240rpx;
  height: 180rpx;
  margin-right: 20rpx;
}
.analyze_content {
  display: flex;
  flex-flow: column nowrap;
  height: 240rpx;
  padding: 30rpx 0;
  box-sizing: border-box;
  justify-content: space-between;
}
.analyze_title {
  font-size: 32rpx;
}
.add_time {
  font-size: 25rpx;
  color: #a9a9a9;
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

/* 内容 */
.jobinfo {
  height: 200rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 28rpx;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background-color: #ffffff;
  border-bottom: 1rpx solid #dddddd;
}
.jobinfo_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.job_title {
  font-size: 33rpx;
}
.job_wage {
  font-size: 28rpx;
  color: #fc5a4f;
}
.firm {
  font-size: 30rpx;
}


.jobinfo_down {
  /* display: flex; */
  font-size: 28rpx;
  color: #666666;
}
.job_count {
  display: inline-block;
  width: 129rpx;
}

.job_area {
  float: right;
}

.applyinfo {
  height: 140rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #dddddd;
  padding: 25rpx 25rpx;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}
.applyinfo_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.applyinfo_top .apply_title {
  font-size: 33rpx;
}
.apply_wage {
  font-size: 28rpx;
  color: #fc5a4f;
}
.applyinfo_down {
  font-size: 28rpx;
  color: #666666;
}
.apply_name {
  display: inline-block;
  width: 150rpx;
}
.apply_area {
  float: right;
}

.farm_info {
  height: 260rpx;
  background-color: #ffffff;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #dddddd;
  position: relative;
}
.farm_img image {
  width: 230rpx;
  height: 220rpx;
}
.farm_intro {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  font-size: 28rpx;
  height: 100%;
  margin-left: 21rpx;
}
.rent_sale {
  position: absolute;
  right: 30rpx;
}
.icon_circle {
  height: 90rpx;
  width: 90rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34rpx;
  border-radius: 50%;
  border: 3rpx solid;
}
.icon_sale {
  color: #fc5a4f;
  border-color: #fc5a4f;
}
.icon_rent {
  color: #2d64d2;
  border-color: #2d64d2;
}

.edit{
  padding: 10rpx 20rpx ;
  text-align: right;
  background: #ffffff;
  font-size: 28rpx;
  margin-bottom: 20rpx;
}
.edit text{
  display: inline-block;
  width: 80rpx;
  text-align: center;
}
.cartype{
  width: 60rpx;
  font-size: 26rpx;
  text-align: center;
  color: #fc5a4f;
  border: 1rpx solid #fc5a4f;
  border-radius: 5rpx;
  float: left;
}

</style>

<template>
    <view class="container">
        <!--二级导航栏-->
        <view class="navbar">
            <view class="navbar_item {{currentTab==1 ? 'on': ''}}" data-url="1" @tap="navbarTap">买猪</view>
            <view class="navbar_line"></view>
            <view class="navbar_item {{currentTab==2 ? 'on': ''}}" data-url="2" @tap="navbarTap">卖猪</view>
            <view class="navbar_line"></view>
            <view class="navbar_item {{currentTab==3 ? 'on': ''}}" data-url="3" @tap="navbarTap">猪车</view>
            <view class="navbar_line"></view>
            <view class="navbar_item {{currentTab==4 ? 'on': ''}}" data-url="4" @tap="navbarTap">求职</view>
            <view class="navbar_line"></view>
            <view class="navbar_item {{currentTab==5 ? 'on': ''}}" data-url="5" @tap="navbarTap">招聘</view>
             <view class="navbar_line"></view>
            <view class="navbar_item {{currentTab==6 ? 'on': ''}}" data-url="6" @tap="navbarTap">猪场租售</view>
        </view>

        <view class="section" wx:if="{{currentTab==1}}">
          <repeat for="{{storageList}}" key="index" index="index" item="item">
        <view class="info_box ">
        <navigator url="../home/pigdetails?id={{item.id}}">
          <image class="info_img" src="{{item.image[0]}}" mode="aspectFill" />
        <view class="info_text">
          <view class="info_top"><text class="info_title">{{item.address+"求购"+item.pig_type_name+item.nums+"头"}}</text></view>
          <view class="info_center"><text class="info_price">{{item.price}}元/斤</text><text class="info_size">规格：{{item.weight}}kg/头</text></view>
          <view class="info_down"><text class="info_var">{{item.pig_type_name}}</text><text class="info_address">{{item.address}}</text><text class="info_time">{{item.buy_time}}</text></view>
        </view>
        </navigator>
        <view class="edit" ><text @tap="gotoEdit({{item}})">编辑</text></view>
       </view>
      </repeat>
    </view> 

     <view class="section" wx:if="{{currentTab==2}}">
         <repeat for="{{storageList}}" key="index" index="index" item="item">
        <view class="info_box">
        <navigator url="../home/sellerDetails?id={{item.id}}">
          <image class="info_img" src="{{item.image[0]}}" mode="aspectFill" />
        <view class="info_text">
          <view class="info_top"><text class="info_title">{{item.address+"提供"+item.pig_type_name+item.nums+"头"}}</text></view>
          <view class="info_center"><text class="info_price">{{item.price}}元/斤</text><text class="info_size">规格：{{item.weight}}kg/头</text></view>
          <view class="info_down"><text class="info_var">{{item.pig_type_name}}</text><text class="info_address">{{item.address}}</text><text class="info_time">{{item.out_time}}</text></view>
        </view>
        </navigator>
         <view class="edit"><text @tap="gotoEdit({{item}})">编辑</text></view>
       </view>
      </repeat>
    </view> 

        <view class="section" wx:if="{{currentTab==3}}">
         <repeat for="{{storageList}}" key="index" index="index" item="item">
        <view class="findgoods" bindtap="gotocar({{item}})">
            <view class="findgoods_top">
        <text>{{item.address}}</text><text class="linkLine">{{item.send_time}}</text><text>{{item.destination}}</text>
        </view>
        <view class="findgoods_down">
        <text>车型：{{item.car_type}}</text>
        <text>猪笼：{{item.pig_cage}}</text>
        <text>当前所在地：{{item.address}}</text>
    </view>
    
    </view>
     <view class="edit"> <text class="cartype">{{item.type==1? "找车": "找货" }}</text><text @tap="gotoEdit({{item}})">编辑</text></view>
    </repeat>
    </view> 

    <view class="section" wx:if="{{currentTab==5}}">
        <repeat for="{{storageList}}" key="index" index="index" item="item">
    <view class="jobinfo" @tap="gotoJob({{item}})">
        <view class="jobinfo_top"><text class="job_title">{{item.job_name}}</text><text class="job_wage">{{item.salary}}元/月</text></view>
        <view class="firm">{{item.com_name}}</view>
        <view class="jobinfo_down"><text class="job_count">{{item.nums}}人</text><text class="job_exp">工作经验：{{item.exper}}年</text><text class="job_area">{{item.address}}</text></view>
    </view>
     <view class="edit"><text @tap="gotoEdit({{item}})">编辑</text></view>
    </repeat>
    </view> 

      <view class="section" wx:if="{{currentTab==4}}">
        <repeat for="{{storageList}}" key="index" index="index" item="item">
        <view class="applyinfo" @tap="gotoApply({{item}})">
            <view class="applyinfo_top">
                <text class="apply_title">{{item.job_name}}</text><text class="apply_wage">{{item.salary}}元/月</text>
            </view>
            <view class="applyinfo_down">
                <text class="apply_name">{{item.name}}</text><text class="apply_exp">岗位工龄：{{item.exper}}年</text><text class="apply_area">{{item.address}}</text>
            </view>
        </view>
        <view class="edit"><text @tap="gotoEdit({{item}})">编辑</text></view>
    </repeat>
    </view> 

     <view class="section" wx:if="{{currentTab==6}}">
         <repeat for="{{storageList}}" key="index" index="index" item="item">
        <view class="farm_info" bindtap="gotoDetails({{item}})">
            <view class="farm_img"><image src="{{item.image[0]}}" /></view>
            <view class="farm_intro">
                <text>规模：{{item.scale}}</text>
                <text>地址：{{item.address}}</text>
                <text>建筑面积：{{item.area}}平方米</text>
                <text>建厂日期：{{item.b_ctime}}</text>
            </view>
            <view class="rent_sale">
                <view class="icon_circle {{item.type==1 ? 'icon_rent' : 'icon_sale' }}">{{type[item.type-1]}}</view>
            </view>
        </view>
         <view class="edit"><text @tap="gotoEdit({{item}})">编辑</text></view>
        </repeat>
    </view> 
    </view>
</template>

<script>
import wepy from 'wepy'
import { shttp } from '../../utils/http'
export default class MyPublish extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: '我的发布'
  }
  data = {
    currentTab: "1",
      publishList:[],
      storageList:[],
       page:1,
       listQuery: {
      type:1,
      page: 1,
      limit: 10,
    },
     type:["租","售"],
  }
   onLoad(options) {
     this.getUserInfo()
    //打开转发
    wx.showShareMenu({
      withShareTicket: true
    });
   
  }
  
  onShow(){
    wx.showLoading({
      title: "加载中"
    });
     this.idxReset()
    this.getPublish();
  }


  computed = {}

  components = {}

  methods = {
   navbarTap: function(e) {
      this.currentTab = e.currentTarget.dataset.url;
      this.listQuery.type=this.currentTab;
      wx.showLoading({
      title: "加载中"
      });
      this.idxReset();
      this.getPublish();
    },
     gotocar(data){
            if(data.type==2){
             wx.navigateTo({
             url:`../home/trucksDetails?id=${data.id}`
             })
            }else{
            wx.navigateTo({
            url:`../home/carDetails?id=${data.id}`
            })
            }
        },
  gotoJob(data) {
      wx.navigateTo({
        url: `../home/recruitDetails?id=${data.id}`
      });
    },
    gotoApply(data) {
      wx.navigateTo({
        url: `../home/applyDetails?id=${data.id}`
      });
    },
    
    gotoDetails(data) {
      wx.navigateTo({
        url: `../home/farmDetails?id=${data.id}`
      });
    },
    gotoEdit(data){
      var currentTab=this.currentTab
      console.log("333"+currentTab)
      switch(currentTab){
        case "1":
         wx.navigateTo({
        url: `../edit/editbuyer?id=${data.id}`
        });
        break;
        case "2":
         wx.navigateTo({
        url: `../edit/editseller?id=${data.id}`
        });
        break;
        case "3":
         if(data.type==2){
             wx.navigateTo({
              url: `../edit/editdriver?id=${data.id}`
               });
            }else{
            wx.navigateTo({
           url: `../edit/editcar?id=${data.id}`
           });
            }
        
        break;
        case "4":
         wx.navigateTo({
        url: `../edit/editjobs?id=${data.id}`
        });
        break;
        case "5":
         wx.navigateTo({
        url: `../edit/editrecruit?id=${data.id}`
        });
        break;
        case "6":
         wx.navigateTo({
        url: `../edit/rsedit?id=${data.id}`
        });
        break;
      }
    }
  }

  //获取我的发布列表
  async getPublish() {
    const res = await shttp
      .get(`/api/v1/member/mypublish`)
       .query(this.listQuery)
      .end();
    this.publishList = res.data;
    
    for(var i in this.publishList){
        if(this.publishList[i].image!=undefined){
        this.publishList[i].image=this.publishList[i].image.split(",");
        }
          this.storageList.push(this.publishList[i])
    };
    console.log(this.publishList)
    if (res.status === 0) {
      if (this.publishList.length == 0) {
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

 idxReset(){
    this.listQuery.page = 1;
    this.page=1;
    this.publishList = [];
    this.storageList=[]
  }

  //下拉刷新
  onPullDownRefresh() {
     this.idxReset()
    wx.showLoading({
      title: "加载中"
    });
    this.getPublish();
  }
  //上拉加载更多
  onReachBottom() {
    this.page=this.listQuery.page;
    wx.showLoading({
      title: "玩命加载中"
    });
    this.listQuery.page = this.listQuery.page + 1;
    //获取商品
    this.getPublish();
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
