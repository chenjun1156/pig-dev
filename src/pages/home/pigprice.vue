<style  scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
}
.price_info {
  height: 190rpx;
  background-color: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 20rpx;
  box-sizing: border-box;
  border-bottom: 1rpx solid #dddddd;
}
.price_breed {
  font-size: 30rpx;
  color: #333333;
  display:flex;
  justify-content: space-between;
}
.price_text {
  font-size: 28rpx;
  color: #666666;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
}
.price_text text {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pig_price {
  font-size: 32rpx;
  color: #fc5a4f;
}
.classify navigator {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.classify {
  height: 90rpx;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: #666666;
  border-bottom: 1rpx solid #dddddd;
  justify-content: space-between;
}
.classify view {
  height: 100%;
  width:195rpx;
  font-size: 25rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.drop_icon {
  height: 12rpx;
  width: 18rpx;
  margin-left: 7rpx;
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
.price_title{
  font-size: 28rpx;
   word-break:break-all;
}

</style>

<template>
  <view class="container">
   <!-- 下拉框 -->
     <view class="classify">
       
       
             <view class="classify_item" @tap="clickTab" data-idx='1'>
        <picker  bindchange="getKind" value="{{index}}" range="{{breed_type}}"  bindcancel="cancel">
            <view class="picker {{navindex==1 ? 'active':''}}"  >{{ slaughter ? breed_type[slaughter-1]: "屠宰场"}}
            <!-- <view class="picker {{navindex==1 ? 'active':''}}"  >屠宰场 -->
              <image class="drop_icon" src="{{navindex==1 ? dropTab : drop}}" />
            </view>
            </picker>
            </view>
            
             <view class="classify_item" @tap="clickTab" data-idx='2'>
        <picker  bindchange="getBrand" value="{{index}}" range="{{breed_type}}"  bindcancel="cancel">
            <!-- <view class="picker {{navindex==2 ? 'active':''}}"  >品牌猪场 -->
            <view class="picker {{navindex==2 ? 'active':''}}"  >{{ brand ? breed_type[brand-1]: "品牌猪场"}}
              <image class="drop_icon" src="{{navindex==2 ? dropTab : drop}}"/>
            </view>
            </picker>
            </view>
       <view><navigator url="./analyze">猪链分析</navigator></view>
     </view>

      <view class="section">
    <repeat for="{{storageList}}" key="index" index="index" item="item">
     <view class="price_info" @tap="gotoDetails({{item}})">
           <view class="price_breed"><text style="display:inline-block;width:220rpx;">{{item.breed_type}}</text><text class="price_title">{{item.title}}</text></view>
           <view class="price_text"><text class="pig_price">{{item.price}}元/斤</text><text>{{item.address}}</text><text>{{item.pub_time}}</text></view>
     </view>
     </repeat>
        </view>
  </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class PigPrice extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "猪价"
  };
  data = {
    //猪价列表
    priceList: [],
     storageList:[],
     navindex: null,
    drop: "../../images/icon_xiala@2x.png",
    dropTab: "../../images/icon_xialax@2x.png",
    breed_type: ["外三元","内三元","土杂猪"],
     slaughter:"",
     brand:"",
     page:1,
     info:[],
    listQuery: {
      type: "",
      breed_type:"",
      page: 1,
      limit: 10,
    },
  };
onLoad(options) {
  this.navindex=options.id;
    this.listQuery.type=this.navindex;
    if(this.listQuery.type==""||this.listQuery.type===undefined){
      this.navindex=1;
        this.listQuery.type=1;
    }
    //打开转发
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showLoading({
      title: "加载中"
    });
    this.getPriceList();
  }
  computed = {};

  components = {};

  methods = {
    getKind: e => {
      this.slaughter = parseInt(e.detail.value) + 1;
      this.listQuery.breed_type=this.slaughter;
      wx.showLoading({
        title: "加载中"
      });
       this.brand="";
      this.idxReset();
      this.getPriceList();
      // this.navindex = null;
    },

     getBrand: e => {
      this.brand = parseInt(e.detail.value) + 1;
       this.listQuery.breed_type=this.brand;
      wx.showLoading({
        title: "加载中"
      });
      this.slaughter="";
      this.idxReset();
      this.getPriceList();
      // this.navindex = null;
    },


    clickTab: e => {
      this.navindex = e.currentTarget.dataset.idx;
      this.listQuery.type=this.navindex;
      this.listQuery.breed_type="";
      this.brand="";
      this.slaughter="";
      this.idxReset();
      this.getPriceList();
      },
    // cancel: () => ( this.navindex = null),
    gotoDetails(data){
      wx.navigateTo({
        url: `./priceinfo?id=${data.id}`
      })
    }
  };

  //获取猪价列表
  async getPriceList() {
    for (let key in this.listQuery) {
      if (!this.listQuery[key]) {
        delete this.listQuery[key];
      }
    }
    const res = await shttp
      .get(`/api/v1/home/pigprice`)
      .query(this.listQuery)
      .end();
    this.priceList = res.data;
    
     for(var i in this.priceList){
      this.getDetails(this.priceList[i].id,i);
    this.storageList.push(this.priceList[i])
    }
    if (res.status === 0) {
      if (this.priceList.length ==0) {
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
//获取猪价详情
   async getDetails(id,index) {
    const res = await shttp
      .get(`/api/v1/home/pigpriceinfo`)
      .query({
        id: id
      })
      .end();
      let content=res.data.content.split("|");
      console.log(content)
      if(content[1]){
      this.priceList[index].title=content[1]
      }
    this.$apply();
  }

   //下标重置
  idxReset(){
    this.listQuery.page = 1;
    this.page=1;
    this.priceList = [];
    this.storageList=[]
  }

 //下拉刷新
  onPullDownRefresh() {
    this.navindex=this.listQuery.type;
     this.listQuery.breed_type="";
     this.brand="";
     this.slaughter="";
     this.idxReset();
    wx.showLoading({
      title: "加载中"
    });
    this.getPriceList();
  }
  //上拉加载更多
  onReachBottom() {
    this.page=this.listQuery.page;
    wx.showLoading({
      title: "玩命加载中"
    });
    this.listQuery.page = this.listQuery.page + 1;
    //获取商品
    this.getPriceList();
    console.log(this.page)
  }
}
</script>
