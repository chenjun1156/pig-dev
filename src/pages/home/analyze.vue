<style  scoped>
.container {
  background: #f4f4f4;
  height: 100vh;
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

</style>

<template>
  <view class="container">
    <!-- 下拉框 -->
     <view class="classify">
       <view @tap="gotoprice" data-idx="1"><text>屠宰场</text><image class="drop_icon" src="../../images/icon_xiala@2x.png" /></view>
       <view @tap="gotoprice"  data-idx="2"><text>品牌猪场</text><image class="drop_icon" src="../../images/icon_xiala@2x.png"/></view>
       <view style="color:#fc5a4f">猪链分析</view>
     </view>
     
     <view class="section">
           <repeat for="{{storageList}}" index="index" key="index" item="item">
     <view class="analyze_data">
         <navigator url="../../pages/home/analyzeDetails?id={{item.id}}">
          <image src="{{item.image[0]}}" mode="aspectFill" />
                <view class="analyze_content">
                    <text class="analyze_title">{{item.title}}</text>
                    <text class="add_time">{{item.pub_time}}</text>
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
export default class Analyze extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: "猪价"
  };
  data = {
      analyzeList:[],
      storageList:[],
      name:"",
      page:1,
      listQuery: {
      page: 1,
      limit: 10,
    }
  };

  computed = {};

  components = {
  };
  onLoad(options) {
    //打开转发
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showLoading({
      title: "加载中"
    });
    this.getLinkpig();
  }
  methods = {
    //去猪价
    gotoprice(e){
      wx.navigateTo({
      url: `./pigprice?id=${e.currentTarget.dataset.idx}`,
      })
    },
      
  };

   //获取链猪列表
  async getLinkpig() {
    for (let key in this.listQuery) {
      if (!this.listQuery[key]) {
        delete this.listQuery[key];
      }
    }
    const res = await shttp
      .get(`/api/v1/home/linkpig`)
       .query(this.listQuery)
      .end();
    this.analyzeList = res.data;
    for(var i in this.analyzeList){
    this.analyzeList[i].image=this.analyzeList[i].image.split(",");
    this.storageList.push(this.analyzeList[i])
    };
    console.log(this.analyzeList)
    if (res.status === 0) {
      if (this.analyzeList.length == 0) {
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
    this.analyzeList = [];
    this.storageList=[]
  }

  //下拉刷新
  onPullDownRefresh() {
     this.idxReset()
    wx.showLoading({
      title: "加载中"
    });
    this.getLinkpig();
  }
  //上拉加载更多
  onReachBottom() {
    this.page=this.listQuery.page;
    wx.showLoading({
      title: "玩命加载中"
    });
    this.listQuery.page = this.listQuery.page + 1;
    //获取商品
    this.getLinkpig();
  }
}
</script>
