<style>
.container {
  background: #f4f4f4;
  width: 100%;
  overflow: hidden;
}
.swiper {
  height: 400rpx;
  background: #C6C6D1;
}
.swiper image {
  width: 100%;
  height: 400rpx;
}
.tap_item {
  background: #ffffff;
        display: box; 
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
        /* 09版 */
        -webkit-box-lines: multiple;
        /* 12版 */
        -webkit-flex-wrap: wrap;
        -moz-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        -o-flex-wrap: wrap;
        flex-wrap: wrap;
  height: 320rpx;
  width: 100%;
  overflow: hidden;
  margin-top: 20rpx;
  box-sizing: border-box;
}
.item_page {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 15rpx;
}
.item_view {
  font-size: 25rpx;
  width: 25%;
  height: 50%;
  color: #222222;
  /* flex 各个版本兼容 */
        display: box; 
        display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;      /* TWEENER - IE 10 */
        display: -webkit-flex;     /* NEW - Chrome */
        display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
        /* 09版 */
        -webkit-box-pack: center;
        /* 12版 */
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        -o-justify-content: center;
        justify-content: center;
        /* 09版 */
        -webkit-box-align: center;
        /* 12版 */
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        /* 09版 */
        -webkit-box-orient: vertical;
        /* 12版 */
        -webkit-flex-direction: column;
        -moz-flex-direction: column;
        -ms-flex-direction: column;
        -o-flex-direction: column;
        flex-direction: column;
}

.news_title {
  height: 68rpx;
  line-height: 68rpx;
  padding-left: 31rpx;
}
.new_text {
  font-size: 28rpx;
}
.new_msg {
  display: -webkit-box;
  display: flex;
  -webkit-justify-content: space-between;
   justify-content: space-between;
  margin: 0 20rpx;
}
.msg_item {
  width: 223rpx;
  height: 130rpx;
  background: #ffffff;
  border-radius: 15rpx;
  display: -webkit-box;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-flex-flow: column nowrap;
  flex-flow: column nowrap;
}
.msg_price {
  color: #fa5a4d;
  font-size: 30rpx;
}
.msg_variety {
  color: #666666;
  font-size: 26rpx;
}
.new_sell .new_text {
  font-size: 28rpx;
}
.new_sell .info_box {
  margin-bottom: 20rpx;
  width: 100%
}
.seemore{
  display: inline-block;
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
  width: 200rpx;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  color: #666666
}
.section{
  width: 100%;
   display: -webkit-box;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-justify-content: center;
  justify-content: center;
}
</style>
<template>
   <view class="container">
     <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots="{{indicatorDots}}" indicator-active-color="{{indicatorActiveColor}}" indicator-color="{{indicatorColor}}" autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}" circular="true" >
    <repeat for="{{bannerUrls}}" key="index" index="index" item="item">
      <swiper-item>
        <image src="{{item.image}}" mode="aspectFill" @tap="goPageDetail({{item}})" />
      </swiper-item>
    </repeat>
    </swiper>
      <!--分类导航  -->
    <view class="tap_item">
      <navigator class="item_view" url="./home/buypig">
        <image class="item_page" src="../images/icon1_mai1@2x.png" />
         <text>买猪</text>
      </navigator>
       <navigator class="item_view" url="./home/sellpig">
        <image class="item_page" src="../images/icon1_mai2@2x.png" />
         <text>卖猪</text>
      </navigator>
       <navigator class="item_view" url="./home/pigprice">
        <image class="item_page" src="../images/icon1_zhujia@2x.png" />
         <texttexttext>猪价</texttexttext>
      </navigator>
       <navigator class="item_view" url="./home/pigcar">
        <image class="item_page" src="../images/icon1_zhuche@2x.png" />
         <texttext>猪车</texttext>
      </navigator>
       <navigator class="item_view" url="./home/brand">
        <image class="item_page" src="../images/icon1_pinpai@2x.png" />
         <text>品牌企业</text>
      </navigator>
       <navigator class="item_view" url="./home/job">
        <image class="item_page" src="../images/icon1_qiuzhi@2x.png" />
         <text>求职招聘</text>
      </navigator>
       <navigator class="item_view" url="./home/pigfarm">
        <image class="item_page" src="../images/icon1_zhuchang@2x.png" />
         <text>猪场租售</text>
      </navigator>
       <navigator class="item_view" url="./home/pigcollege">
        <image class="item_page" src="../images/icon1_xueyuan@2x.png" />
         <text>养猪学院</text>
      </navigator>
    </view>

    <!-- 资讯 -->
    <view>
      <!-- 今日猪价 -->
      <view class="new_price">
        <view class="news_title">
          <text class="new_text">今日猪价</text>
        </view>
          <view class="new_msg">
            <repeat for="{{newPrice}}" key="index" index="index" item="item">
              <navigator class="msg_item" url='./home/pigprice'>
                <view class="msg_price">{{item.price}}元/斤</view>
                <view class="msg_variety">{{item.breed_type}}</view>
              </navigator>
              </repeat>
              <view class="msg_item" wx:if="{{newPrice.length==0}}" style="font-size:30rpx;color:#fa5a4d;">
                暂无
              </view>
          </view>
      </view>
      <!-- 卖猪-->
      <view class="new_sell">
        <view class="news_title">
          <text class="new_text">卖猪</text>
        </view>

        <view class="section" >
        <repeat for="{{sellList}}" key="index" index="index" item="item">
        <view class="info_box">
         <navigator url="./home/sellerDetails?id={{item.id}}">
        <image class="info_img" src="{{item.image[0]}}" mode="aspectFill" />
        <view class="info_text">
          <view class="info_top"><text class="info_title">{{item.address+"提供"+item.pig_type_name+item.nums+"头"}}</text></view>
          <view class="info_center"><text class="info_price">{{item.price}}元/斤</text><text class="info_size">规格：{{item.weight}}kg/头</text></view>
          <view class="info_down"><text class="info_var">{{item.pig_type_name}}</text><text class="info_address">{{item.address}}</text><text class="info_time">{{item.ctime}}</text></view>
        </view>
        </navigator>
       </view>
        </repeat>
        <navigator class="seemore" url="./home/sellpig">查看更多</navigator>
      </view>
      </view>
    </view>

   </view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
export default class Home extends wepy.page {
  config = {
     enablePullDownRefresh: true,
    navigationBarTitleText: "链猪",
  };
  data = {
    //轮播配置
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 200,
    indicatorActiveColor: "#fc5c4f",
    indicatorColor: "#2f2d29",
    //轮播图
    bannerUrls: [],
    //今日猪价
    newPrice: [],
    //卖猪
    sellList: [],
  }
  //下拉刷新
     onPullDownRefresh() {
      this.getbannerList();
    this.getNewPrice();
    this.getSellpigList();
    }
  
  onShow() {
    //这里判断是否获取了微信信息
    this.wxUserInfo = wx.getStorageSync("wxUserInfo") || null;
    if (!this.wxUserInfo) {
      wx.redirectTo({
        url: "/pages/authorization"
      });
    }else if(!this.wxUserInfo.phone){
      wx.redirectTo({
        url: "/pages/login/login"
      });
    }
  }
  components = {};
  onLoad(options) {
    //打开转发
    wx.showShareMenu({
  withShareTicket: true
    });
    this.getbannerList();
    this.getNewPrice();
    this.getSellpigList();
  }
  onShow() {}
  methods = {
    goPageDetail(data){
      if(data.type==1){
        wx.navigateTo({
          url:`./bannerJump/jumpImg?imgurl=${data.jump_image}&&title=${data.title}`,
        })
      }else if(data.type==2){
         wx.navigateTo({
          url:`./bannerJump/jumpUrl?url=${data.jump_url}`,
        })
      }
    }
  };
  
  //获取首页轮播图 
  async getbannerList(){
    const res= await shttp
    .get(`/api/v1/home/lunboimg`)
    .query({
      // page:1,
      // limit:3
    })
    .end();
    this.bannerUrls=res.data;
    wx.hideLoading();
    wx.stopPullDownRefresh()
    this.$apply();
  }

  //获取今日猪价 
  async getNewPrice(){
    const res= await shttp
    .get(`/api/v1/home/dayprice`)
    .query({
      page:1,
      limit:3
    })
    .end();
    this.newPrice=res.data;
    wx.hideLoading();
    wx.stopPullDownRefresh()
    this.$apply();
  }

  //获取首页卖猪列表
  async getSellpigList(){
    const res= await shttp
    .get(`/api/v1/home/sellpig`)
    .query({
      page:1,
      limit:6
    })
    .end();
    this.sellList=res.data;
    for(var i in this.sellList){
    this.sellList[i].image=this.sellList[i].image.split(",");
    }
    console.log(this.sellList)
    wx.stopPullDownRefresh()
    this.$apply();
  }
}
</script>
