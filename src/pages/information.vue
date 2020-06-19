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
  align-items: flex-start;
}
.navbar_line {
  width: 1px;
  height: 60rpx;
  background-color: #dddddd;
  margin-top: 23rpx;
}
.navbar_item {
  width: 25%;
  height: 96rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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
</style>

<template>
    <view class="container">
        <!--二级导航栏-->
        <view class="navbar">
            <view class="navbar_item {{currentTab==1 ? 'on': ''}}" data-url="1" @tap="navbarTap">猪业头条</view>
            <view class="navbar_line"></view>
            <view class="navbar_item {{currentTab==2 ? 'on': ''}}" data-url="2" @tap="navbarTap">市场行情</view>
            <view class="navbar_line"></view>
            <view class="navbar_item {{currentTab==3 ? 'on': ''}}" data-url="3" @tap="navbarTap">养猪技术</view>
            <view class="navbar_line"></view>
            <view class="navbar_item {{currentTab==4 ? 'on': ''}}" data-url="4" @tap="navbarTap">企业动态</view>
        </view>

        <view class="section">
          <repeat for="{{storageList}}" index="index" key="index" item="item">
        <view class="analyze_data">
            <navigator url="./article/articleDetails?id={{item.id}}">
                <image src="{{item.image}}" mode="aspectFill" />
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
import wepy from 'wepy'
import { shttp } from '../utils/http'
export default class Information extends wepy.page {
  config = {
    enablePullDownRefresh: true,
    navigationBarTitleText: '养猪资讯'
  }
  data = {
    currentTab: 1,
      articleList:[],
      storageList:[],
      page:1,
      listQuery: {
      class_id:"1",
      page: 1,
      limit: 10,
    }
  }
   onLoad(options) {
    //打开转发
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showLoading({
      title: "加载中"
    });
    this.getArticle();
  }


  computed = {}

  components = {}

  methods = {
   navbarTap: function(e) {
      this.currentTab = e.currentTarget.dataset.url;
      this.listQuery.class_id=this.currentTab;
      wx.showLoading({
      title: "加载中"
      });
      this.idxReset();
      this.getArticle();
    }
  }

  //获取品牌企业列表
  async getArticle() {
    const res = await shttp
      .get(`/api/v1/home/article`)
       .query(this.listQuery)
      .end();
    this.articleList = res.data;
    for(var i in this.articleList){
    this.articleList[i].image=this.articleList[i].image.split(",");
    this.storageList.push(this.articleList[i])
    };
    console.log(this.articleList)
    if (res.status === 0) {
      if (this.articleList.length == 0) {
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
    this.articleList = [];
    this.storageList=[]
  }

  //下拉刷新
  onPullDownRefresh() {
     this.idxReset()
    wx.showLoading({
      title: "加载中"
    });
    this.getArticle();
  }
  //上拉加载更多
  onReachBottom() {
    this.page=this.listQuery.page;
    wx.showLoading({
      title: "玩命加载中"
    });
    this.listQuery.page = this.listQuery.page + 1;
    //获取商品
    this.getArticle();
  }
}
</script>
