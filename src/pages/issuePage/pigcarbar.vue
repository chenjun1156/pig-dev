<style scoped>
.container{
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30rpx 30rpx 0 30rpx;
  align-content: flex-start;
  
}
.issue_item{
  height: 335rpx;
  width: 330rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#ffffff;
  flex-flow: column nowrap;
  margin-bottom: 30rpx;
}

.issue_item image{
  height: 100rpx;
  width: 100rpx;
  margin-bottom: 27rpx;
}
.issue_item text{
  font-size: 36rpx;
  color: #222222;
}
</style>

<template>
  <view class="container">
    <repeat for="{{issue}}" index="index" key="index" item="item" >
    <navigator class="issue_item" url="./{{item.url}}">
      <image src="{{item.image}}"/>
      <text>{{item.title}}</text>
    </navigator>
    </repeat>
   </view>
</template>

<script>
import wepy from "wepy";
export default class PigCarBar extends wepy.page {
  config = {
    navigationBarTitleText: "猪车发布"
  };
  data = {
    issue:[
      {title:"找货",image:"../../images/icon3_zhaoche@2x.png",url:"findDriver"},
      {title:"找车",image:"../../images/icon3_zhaohuo@2x.png",url:"findCar"},
      ]
  };

  computed = {};

  components = {};

  methods = {};
}
</script>

