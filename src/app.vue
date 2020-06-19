<style>
page {
  height: 100%;
  width: 100%;
  font-family: arial, "PingFang SC", "Microsoft Yahei", "Hiragino Sans GB";
}
.seek{
  width: 80%;
}
.search_btn{
  padding: 0;
  margin: 0;
  font-size: 28rpx;
  width: 100rpx;
  margin-left: 20rpx;
  background: #ffffff;
  color: #666666
}

.search_btn::after{
  border: none;
}
/* 买猪/买猪展示*/
.toolBar{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
}
.info_box navigator {
    height: 260rpx;
    background-color: #ffffff;
    display: -webkit-box;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    border-bottom:1rpx solid #dddddd;
}

.info_img {
    height: 220rpx;
    width: 230rpx;
    margin-left: 30rpx;
    margin-right: 24rpx;
}

.info_text {
    width: 436rpx;
    height: 200rpx;
     display: -webkit-box;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-align-content: space-between;
    align-content: space-between;
}

.info_title {
    font-size: 32rpx;
}

.info_price {
    font-size: 30rpx;
    color: #fc5a4f;
    margin-right: 56rpx;
}

.info_size {
    font-size: 28rpx;
    color: #666666;
}

.info_down {
    width: 100%;
    font-size: 26rpx;
    color: #666666;
     display: -webkit-box;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
}

  /* 联系电话 */
.details_phone{
  height: 110rpx;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  font-size: 28rpx;
  color: #ffffff;
  background-color: #ffffff;
}
.details_phone view{
  background-color: #fc5a4f;
}
.seller{
  height: 110rpx;
  width: 158rpx;
  margin-right: 2rpx;
  box-sizing: border-box;
  padding: 12rpx;
  display: -webkit-box;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
}
.seller_phone{
  height: 110rpx;
  width: 690rpx;
  display: -webkit-box;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
}
.seller_phone image{
height: 41rpx;
width: 41rpx;
margin-right: 23rpx;
}

 /* 新增段落 */
.remark{
   background-color: #ffffff;
   width: 100%;
   margin-top: 20rpx;
   font-size: 28rpx;
}
.remark_title{
  padding: 20rpx 20rpx 0 20rpx;
  font-size: 30rpx;
}
.remark .remark_text{
  font-size: 30rpx;
  padding: 15rpx 20rpx;
  box-sizing: border-box;
  color: #666666;
  word-wrap: break-word
}
.remark_width{
  width: 100%;
  margin-top: 5rpx;
}

.addsection {
  display: inline-block;
  height: 60rpx;
  width: 180rpx;
  padding: 0;
  margin: 30rpx 0rpx;
  margin-right: 30rpx;
  font-size: 28rpx;
  line-height: 60rpx;
  color: #fc5a4f;
}
.addsection::after {
  border: 4rpx solid #fc5a4f;
}

.detail_img {
  width: 100%;
  height: 100%;
}

.img_box {
   width: 200rpx;
  height: 280rpx;
  position: relative;
  background: #ffffff;
  margin-bottom: 30rpx;
}
.video_box {
  display: flex;
  align-items: center; /*垂直居中*/
  justify-content: center; /*居中对齐*/
  position: relative;
}
 .del_img {
  position: absolute;
  right: -25rpx;
  top: -20rpx;
  height: 40rpx;
  width: 40rpx;
}

#prew_video {
  position: absolute;
  left: 0;
  top: 0;
}
.upload_box{
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.upload_box:after{
  content: ""; width: 200rpx; 
}


</style>

<script>
import wepy from "wepy";
import "wepy-async-function";
import { shttp } from "./utils/http";
import { signIn } from "./utils/user-tools";
export default class extends wepy.app {
  config = {
    pages: [
      "pages/authorization", //授权页
      "pages/login/login",    //登录
      "pages/home",         //主页
      "pages/issue",        //发布
      "pages/information",  //咨询
      "pages/mine",          //我的

      "pages/bannerJump/jumpUrl", //轮播跳转链接
      "pages/bannerJump/jumpImg", //轮播跳转链接

      "pages/home/buypig", //买猪
      "pages/home/pigdetails", //买猪详情
      "pages/home/sellpig",//卖猪
      "pages/home/sellerDetails", //买猪详情
      "pages/home/pigprice",//猪价
      "pages/home/priceinfo",//猪价详情
      "pages/home/analyze",//链猪分析
      "pages/home/analyzeDetails", //链猪分析详情
      "pages/home/pigcar", //猪车
      "pages/home/trucksDetails", //货车详情
      "pages/home/carDetails",//找车详情
      "pages/home/brand",//品牌企业
      "pages/home/brandDetails",//品牌企业详情
      "pages/home/job",//求职招聘
      "pages/home/recruitDetails",//招聘详情
      "pages/home/applyDetails", //求职详情
      "pages/home/pigfarm",//猪场租售
      "pages/home/farmDetails", //猪场详情
      "pages/home/pigcollege", //养猪学院
      "pages/home/collegeDetails", //养猪学院详情

      "pages/issuePage/sellForm", //卖猪发布
      "pages/issuePage/buyForm", //买猪发布
      "pages/issuePage/pigcarbar", //猪车发布
      "pages/issuePage/findDriver", //找货发布
      "pages/issuePage/findCar", //找车发布
      "pages/issuePage/recruitForm", //招聘发布
      "pages/issuePage/jobsForm", //求职发布
      "pages/issuePage/rsForm", //猪场租售发布

      "pages/edit/editbuyer",//修改买猪
      "pages/edit/editseller",//修改卖猪
      "pages/edit/editcar",//修改找车
      "pages/edit/editdriver",//修改找货
      "pages/edit/editjobs",//修改求职
      "pages/edit/editrecruit",//修改招聘
      "pages/edit/rsedit",//修改猪场租售

      
      "pages/article/articleDetails", //资讯详情

      "pages/my/contcatus",//联系我们
      "pages/my/mypublish",//我的发布
      "pages/my/cert",//实名认证
      "pages/my/complain",//投诉建议
      "pages/my/buyerCert",//买家认证
      "pages/my/sellerCert",//卖家认证
      "pages/my/driverCert",//司机认证
      "pages/my/comCert",//企业认证

      
    ],
    window: {
      backgroundTextStyle: "dark",
      navigationBarBackgroundColor: "#fb5b4e",
      navigationBarTitleText: "",
      navigationBarTextStyle: "#ffffff",
      enablePullDownRefresh: false,
      backgroundColor: "#EFEFEF"
    },
    tabBar: {
      color: "#888888",
      selectedColor: "#888888",
      backgroundColor: "#ffffff",
      selectedColor:"#fb5b4e",
      borderStyle: "block",
      list: [
        {
          pagePath: "pages/home",
          text: "首页",
          iconPath: "images/icon2_shouyew@2x.png",
          selectedIconPath: "images/icon2_shouye@2x.png"
        },
        {
          pagePath: "pages/issue",
          text: "发布",
          iconPath: "images/icon2_fabuw@2x.png",
          selectedIconPath: "images/icon2_fabu@2x.png"
        },
        {
          pagePath: "pages/information",
          text: "资讯",
          iconPath: "images/icon2_zixunw@2x.png",
          selectedIconPath: "images/icon2_zixun@2x.png"
        },
         {
          pagePath: "pages/mine",
          text: "我的",
          iconPath: "images/icon2_wodew@2x.png",
          selectedIconPath: "images/icon2_wode@2x.png"
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    }
  };

  globalData = {
    userInfo: {}
  };

  constructor() {
    // inject async await function
    super();
    this.use("requestfix");
    this.use("promisify");
  }

  async onLaunch() {
    // console.log("onLaunch");
    //微信用户登录换取token，并将token存入本地缓存中
    // const userInfo = await signIn(false);
    // if (userInfo.status === 0) {
    //   let auth = userInfo.data.token;
    //   wx.setStorageSync("token", auth);
    // }

  }

 
}
</script>
