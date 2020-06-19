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

.classify {
  height: 90rpx;
  display: flex;
  background-color: #ffffff;
  color: #666666;
  border-bottom: 1rpx solid #dddddd;
  box-sizing: border-box;
}
.classify .classify_item {
  height: 100%;
  width:50%;
  font-size: 25rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drop_icon {
  height: 12rpx;
  width: 18rpx;
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
     <input slot="search" class="seek" placeholder="搜索地址/职位" name="name"  value="{{name}}" bindinput="getName" confirm-type="search" bindconfirm="getResult"/>
      <button slot="sbtn" class="search_btn" bindtap="getResult">搜索</button>
    </searchbox>
    <!--二级导航栏-->
 <view class="navbar">
     <view class="navbar_item {{currentTab==0 ? 'on': ''}}" data-url="0" @tap="navbarTap">招聘</view>
     <view class="navbar_line"></view>
     <view class="navbar_item {{currentTab==1 ? 'on': ''}}" data-url="1" @tap="navbarTap">求职</view>
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
       <picker mode="multiSelector" bindchange="bindMultiPickerChange" bindcolumnchange="bindMultiPickerColumnChange"  bindcancel="cancel" value="{{multiIndex}}" range="{{multiArray}}" range-key='job_name'>
        <view class="picker {{navindex==2 ? 'active':''}}"  >
      {{job_name ? job_name : "工种" }}
       <image class="drop_icon" src="{{ navindex==2 ? dropTab : drop}}" />
      </view>
      </picker>
      </view>

     </view>

<view hidden="{{currentTab!=0}}">
    <repeat for="{{newRecruit}}" key="index" index="index" item="item">
    <view class="jobinfo" @tap="gotoJob({{item}})">
        <view class="jobinfo_top"><text class="job_title">{{item.job_name}}</text><text class="job_wage">{{item.salary}}元/月</text></view>
        <view class="firm">{{item.com_name}}</view>
        <view class="jobinfo_down"><text class="job_count">{{item.nums}}人</text><text class="job_exp">工作经验：{{item.exper}}年</text><text class="job_area">{{item.address}}</text></view>
    </view>
    </repeat>
  </view>
 <view hidden="{{currentTab!=1}}">
    <repeat for="{{newApply}}" key="index" index="index" item="item">
        <view class="applyinfo" @tap="gotoApply({{item}})">
            <view class="applyinfo_top">
                <text class="apply_title">{{item.job_name}}</text><text class="apply_wage">{{item.salary}}元/月</text>
            </view>
            <view class="applyinfo_down">
                <text class="apply_name">{{item.name}}</text><text class="apply_exp">岗位工龄：{{item.exper}}年</text><text class="apply_area">{{item.address}}</text>
            </view>
        </view>
    </repeat>
  </view>
</view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import SearchBox from "../../components/searchbox";
export default class Job extends wepy.page {
  config = {
     enablePullDownRefresh: true,
    navigationBarTitleText: "求职招聘"
  };
  data = {
    currentTab: 0,
    navindex: null,
    recruitList: [],
    newRecruit:[],
    applyJob: [],
    newApply:[],
    page:1,
    drop: "../../images/icon_xiala@2x.png",
    dropTab: "../../images/icon_xialax@2x.png",
    city: [], //选择地区
    jobType:[],//工种
    multiIndex:[0,0],
    multiArray: [],
    name: "",
    job_name:"",
    listQuery: {
      name: "",
      job_id:"",
      page: 1,
      limit: 10,
      
    },
  };

  computed = {};

  onLoad(options) {
    //打开转发
     wx.showShareMenu({
      withShareTicket: true
    });
    this.getJobType();
    wx.showLoading({
      title: "加载中"
    });
     if(this.currentTab==0){
        this.getCompany()
      }else{
         this.getJoblist()
      }
  }
  components = {
    searchbox: SearchBox
  };

//重置样式
resetCon(){
    this.city = [];
    this.listQuery.com_name="";
    this.listQuery.job_id="";
     this.listQuery.page = 1;
    this.page=1;
    this.listQuery.name = "";
    this.job_name="",
     this.recruitList=[];
     this.newRecruit=[];
     this.applyJob=[];
     this.newApply=[];
}

//下标重置
idxReset(){
    this.listQuery.page = 1;
    this.page=1;
     this.recruitList=[];
     this.newRecruit=[];
     this.applyJob=[];
     this.newApply=[];
  }
  methods = {
    getName: e => (this.name = e.detail.value),
    clickTab: e => (this.navindex = e.currentTarget.dataset.idx),
    cancel: () => (this.navindex = null),
     navbarTap(e){
      this.currentTab = e.currentTarget.dataset.url;
      this.resetCon();
      this.name = "";
      if(this.currentTab==0){
        this.getCompany()
      }else{
         this.getJoblist()
      }
    },
   bindRegionChange: e => {
      this.city = e.detail.value;
      this.listQuery.name = this.city[1] + this.city[2];
      wx.showLoading({
        title: "加载中"
      });
      this.idxReset();
     if(this.currentTab==0){
        this.getCompany()
      }else{
         this.getJoblist()
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
        this.getCompany()
      }else{
         this.getJoblist()
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
   
    gothird(e) {
      this.thirdTab = e.currentTarget.dataset.index;

      this.toggle = false;
    },

    bindMultiPickerChange:e=>{
      console.log('picker发送选择改变，携带值为', e.detail.value)
        this.multiIndex = e.detail.value;
        this.listQuery.job_id=this.multiArray[1][this.multiIndex[1]].job_id
        this.job_name=this.multiArray[1][this.multiIndex[1]].job_name;
         console.log('job_id', this.listQuery.job_id)
          wx.showLoading({
        title: "加载中"
         });
         this.idxReset();
         if(this.currentTab==0){
        this.getCompany()
         }else{
         this.getJoblist()
         }
      this.navindex = null;
    },
    bindMultiPickerColumnChange:e=>{
      // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data={
            multiArray: this.multiArray,
            multiIndex: this.multiIndex
        }
       data.multiIndex[e.detail.column] = e.detail.value;
       switch (e.detail.column) {
            case 0:
          data.multiArray[1] = this.jobType[e.detail.value].child;
          break;
       }
       data.multiIndex[1] = 0;
    },
   
  };

  //获取工种列表
  async getJobType() {
    const res = await shttp
      .get(`/api/v1/home/jobclass`)
      .end();
      this.jobType=res.data;
      this.jobType=Object.values(this.jobType)
      //对象转数组
      this.jobType = this.jobType.map(o=>{return{job_name:o.name, child:o.child}});
      //给job_id初始值
      this.job_id=this.jobType[0].child[0].job_id;
      this.multiArray=[[...this.jobType],[...this.jobType[0].child]]
      console.log(this.jobType);
      this.$apply();
  }	

   //获取求职列表
  async getJoblist() {
    for (let key in this.listQuery) {
      if (!this.listQuery[key]) {
        delete this.listQuery[key];
      }
    }
    const res = await shttp
      .get(`/api/v1/home/joblist`)
      .query(this.listQuery)
      .end();
    this.applyJob = res.data;
    for(var i in this.applyJob){
    this.newApply.push(this.applyJob[i])
    }
    if (res.status === 0) {
      if (this.applyJob.length == 0) {
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

  //获取招聘列表
  async getCompany() {
    for (let key in this.listQuery) {
      if (!this.listQuery[key]) {
        delete this.listQuery[key];
      }
    }
    const res = await shttp
      .get(`/api/v1/company`)
      .query(this.listQuery)
      .end();
    this.recruitList = res.data;
    for(var i in this.recruitList){
    this.newRecruit.push(this.recruitList[i])
    }
    if (res.status === 0) {
      if (this.recruitList.length == 0) {
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
        this.getCompany()
         }else{
         this.getJoblist()
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
        this.getCompany()
         }else{
         this.getJoblist()
         }
  }

}
</script>
