<style  scoped>
.container {
}
</style>

<template>
  <view class="container">
   <web-view src="{{jump_url}}"></web-view>
  </view>
</template>

<script>
import wepy from "wepy";
export default class JumpUrl extends wepy.page {
  config = {
    navigationBarTitleText: "跳转链接"
  };
  data = {
      jump_url:""
  };

  onLoad(options) {
      this.jump_url=options.url
  }
  
  computed = {};

  components = {};

  methods = {};
}
</script>
