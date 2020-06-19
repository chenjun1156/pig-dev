<style  scoped>
.container {
  background: #f4f4f4;
   padding-top: 188rpx;
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
     <view class="toolBar">
    <!-- 搜索栏 -->
   <searchbox>
     <input slot="search" class="seek" placeholder="搜索地址" name="name"  value="{{name}}" bindinput="getName" confirm-type="search" bindconfirm="getResult"/>
      <button slot="sbtn" class="search_btn" bindtap="getResult">搜索</button>
   </searchbox>
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
        <picker  bindchange="getKind" value="{{index}}" range="{{scale}}"  bindcancel="cancel">
            <view class="picker {{navindex==2 ? 'active':''}}"  >{{ listQuery.scale ? scale[listQuery.scale-1]: "规模"}}
              <image class="drop_icon" src="{{ navindex==2 ? dropTab : drop}}" />
            </view>
            </picker>
            </view>

       <view class="classify_item" @tap="clickTab" data-idx='3'>
         <picker bindchange="bindPickerChange" value="{{index}}" range="{{type}}"  bindcancel="cancel">
        <view class="picker {{navindex==3 ? 'active':''}}"  >{{ listQuery.type ? type[listQuery.type-1]: "租/售"}}
       <image class="drop_icon" src="{{ navindex==3 ? dropTab : drop}}" />
        </view>
        </picker>
            </view>
            </view>
     </view>

    <view class="section">
        <repeat for="{{storageList}}" key="index" index="index" item="item">
        <view class="farm_info" bindtap='gotoDetails({{item}})'>
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
        </repeat>

    </view>

  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import SearchBox from "../../components/searchbox";
export default class pigfarm extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "猪场租售"
  };
  data = {
    // 猪场信息
    farmList: [],
    storageList:[],
    navindex: null,
    drop: "../../images/icon_xiala@2x.png",
    dropTab: "../../images/icon_xialax@2x.png",
    type:["租","售"],
     scale: ["母猪100头"," 母猪200头","母猪300头","母猪400头","母猪500头","母猪500头以上","育肥100头","育肥100-500头","育肥500-1000头","育肥1000-5000头","育肥5000-10000头","育肥10000头以上"],
    city: [], 
    name: "",
    page:1,
    listQuery: {
      address: "",
      scale:"",
      type: "",
      page: 1,
      limit: 10,
      name: ""
    }
  };

  computed = {};

  components = {
    searchbox: SearchBox
  };
 onLoad(options) {
    //打开转发
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showLoading({
      title: "加载中"
    });
    this.getFarm();
  }
  methods = {
    getKind: e => {
      this.listQuery.scale = parseInt(e.detail.value) + 1;
      wx.showLoading({
        title: "加载中"
      });
     this.idxReset();
      this.getFarm();
      this.navindex = null;
    },
     bindRegionChange: e => {
      this.city = e.detail.value;
      this.listQuery.address = this.city[1] + this.city[2];
      wx.showLoading({
        title: "加载中"
      });
     this.idxReset();
      this.getFarm();
      this.navindex = null;
    },
    bindPickerChange:e=>{
        this.listQuery.type = parseInt(e.detail.value) + 1;
      wx.showLoading({
        title: "加载中"
      });
     this.idxReset();
      this.getFarm();
      this.navindex = null;
    },
     getResult: e => {
      this.resetCon();
      this.listQuery.name = this.name;
      wx.showLoading({
        title: "加载中"
      });
      this.getFarm();
    },
    getName: e => (this.name = e.detail.value),
    clickTab: e => (this.navindex = e.currentTarget.dataset.idx),
    cancel: () => (this.navindex = null),

    //获取详情
    gotoDetails(data) {
      wx.navigateTo({
        url: `../home/farmDetails?id=${data.id}`
      });
    }
  };

  //获取猪场租售列表
  async getFarm() {
    for (let key in this.listQuery) {
      if (!this.listQuery[key]) {
        delete this.listQuery[key];
      }
    }
    const res = await shttp
      .get(`/api/v1/home/piggeryleaselist`)
      .query(this.listQuery)
      .end();
    this.farmList = res.data;
    for(var i in this.farmList){
    this.farmList[i].image=this.farmList[i].image.split(",");
    this.storageList.push(this.farmList[i])
    }
    if (res.status === 0) {
      if (this.farmList.length ==0) {
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

  //重置样式
  resetCon() {
    this.listQuery.address = "";
    this.city = [];
    this.listQuery.scale= "";
    this.listQuery.type= "";
    this.listQuery.page = 1;
    this.page=1;
    this.listQuery.name = "";
    this.farmList = [];
     this.storageList=[]
     
  }
  //下标重置
  idxReset(){
    this.listQuery.page = 1;
    this.page=1;
    this.farmList = [];
    this.storageList=[]
  }

  //下拉刷新
  onPullDownRefresh() {
    this.resetCon();
    this.name = "";
    wx.showLoading({
      title: "加载中"
    });
    this.getFarm();
  }

    //上拉加载更多
  onReachBottom() {
    this.page=this.listQuery.page;
    wx.showLoading({
      title: "玩命加载中"
    });
    this.listQuery.page = this.listQuery.page + 1;
    //获取商品
    this.getFarm();
    
  }

}
</script>
