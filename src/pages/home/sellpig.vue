        id:5
<style  scoped>
.container {
  background: #f4f4f4;
  padding-top: 188rpx;
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
     <input slot="search" class="seek" placeholder="搜索品种/地址" name="name"  value="{{name}}" bindinput="getName" confirm-type="search" bindconfirm="getResult"/>
      <button slot="sbtn" class="search_btn" bindtap="getResult">搜索</button>
   </searchbox>

     <view class="classify">
       <view class="classify_item" @tap="clickTab" data-idx='1'>
        <picker  bindchange="getKind" value="{{index}}" range="{{pig_type}}"  bindcancel="cancel">
            <view class="picker {{navindex==1 ? 'active':''}}"  >{{ listQuery.pig_type ? pig_type[listQuery.pig_type-1]: "种类"}}
              <image class="drop_icon" src="{{ navindex==1 ? dropTab : drop}}" />
            </view>
            </picker>
            </view>

            <view class="classify_item" @tap="clickTab" data-idx='2'>
              <picker mode="region"  bindchange="bindRegionChange" value="{{city}}"  bindcancel="cancel">
             <view class="picker {{navindex==2 ? 'active':''}}">
               {{ city[2] ?  (city[1]+city[2]) : "地区"}}
                <image class="drop_icon" src="{{ navindex==2 ? dropTab : drop}}" />
                </view>
            </picker>
            </view>

            <view class="classify_item" @tap="clickTab" data-idx='3'>
          <picker mode="date" value="{{listQuery.ctime}}" end="2028-01-01" bindchange="bindDateChange" bindcancel="cancel">
            <view class="picker {{navindex==3 ? 'active':''}}"  >{{ listQuery.ctime ? listQuery.ctime: "时间"}}
              <image class="drop_icon" src="{{ navindex==3 ? dropTab : drop}}" />
            </view>
            </picker>
            </view>
              
     </view>
    
        </view>
     <!-- 搜索结果 -->
     <view class="search_info">
       <repeat for="{{storageList}}" key="index" index="index" item="item">
        <view class="info_box">
        <navigator url="./sellerDetails?id={{item.id}}">
          <image class="info_img" src="{{item.image[0]}}" mode="aspectFill" />
        <view class="info_text">
          <view class="info_top"><text class="info_title">{{item.address+"提供"+item.pig_type_name+item.nums+"头"}}</text></view>
          <view class="info_center"><text class="info_price">{{item.price}}元/斤</text><text class="info_size">规格：{{item.weight}}斤/头</text></view>
          <view class="info_down"><text class="info_var">{{item.pig_type_name}}</text><text class="info_address">{{item.address}}</text><text class="info_time">{{item.ctime}}</text></view>
        </view>
        </navigator>
       </view>
      </repeat>
     </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
import SearchBox from "../../components/searchbox";
export default class SellPig extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "卖猪"
  };
  data = {
    sellList: [],
     storageList:[],
    navindex: null,
    drop: "../../images/icon_xiala@2x.png",
    dropTab: "../../images/icon_xialax@2x.png",
    pig_type: ["外三元","内三元","良杂猪","土杂猪","土猪","二元仔猪","三元仔猪","土杂仔猪","大约克种猪","长白种猪","长大二元种猪","皮特兰种猪","汉普夏种猪"],
    city: [], //选择地区
    name: "",
    page:1,
    listQuery: {
      address: "",
      pig_type: "",
      ctime: "",
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
    this.getSeller();
  }
  methods = {
    getKind: e => {
      this.listQuery.pig_type = parseInt(e.detail.value) + 1;
      wx.showLoading({
        title: "加载中"
      });
     this.idxReset();
      this.getSeller();
      this.navindex = null;
    },
    bindRegionChange: e => {
      this.city = e.detail.value;
      this.listQuery.address = this.city[1] + this.city[2];
      wx.showLoading({
        title: "加载中"
      });
      this.idxReset();
      this.getSeller();
      this.navindex = null;
    },
    bindDateChange: e => {
      this.listQuery.ctime = e.detail.value;
      wx.showLoading({
        title: "加载中"
      });
      this.idxReset();
      this.getSeller();
      this.navindex = null;
    },

    getResult: e => {
      this.resetCon();
      this.listQuery.name = this.name;
      wx.showLoading({
        title: "加载中"
      });
      this.getSeller();
    },
    getName: e => (this.name = e.detail.value),
    clickTab: e => (this.navindex = e.currentTarget.dataset.idx),
    cancel: () => (this.navindex = null)
  };

  //获取买猪列表
  async getSeller() {
    for (let key in this.listQuery) {
      if (!this.listQuery[key]) {
        delete this.listQuery[key];
      }
    }
    const res = await shttp
      .get(`/api/v1/seller`)
      .query(this.listQuery)
      .end();
    this.sellList = res.data;
     for(var i in this.sellList){
    this.sellList[i].image=this.sellList[i].image.split(",");
    this.storageList.push(this.sellList[i])
    }
    console.log(this.sellList)
    if (res.status === 0) {
      if (this.sellList.length == 0) {
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
    this.listQuery.pig_type = "";
    this.listQuery.ctime = "";
    this.listQuery.page = 1;
    this.page=1;
    this.listQuery.name = "";
    this.sellList = [];
    this.storageList=[]
  }
  //下标重置
  idxReset(){
    this.listQuery.page = 1;
    this.page=1;
    this.sellList = [];
    this.storageList=[]
  }

  //下拉刷新
  onPullDownRefresh() {
    this.resetCon();
    this.name = "";
    wx.showLoading({
      title: "加载中"
    });
    this.getSeller();
  }
  //上拉加载更多
  onReachBottom() {
     this.page=this.listQuery.page;
    wx.showLoading({
      title: "玩命加载中"
    });
    this.listQuery.page = this.listQuery.page + 1;
    //获取商品
    this.getSeller();
  }
}
</script>

