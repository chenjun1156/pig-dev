<style  scoped>
.container {
  background: #f4f4f4;
  padding: 30rpx;
  font-size: 28rpx;
}
.row_box {
  height: 90rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.row_title {
  display: flex;
  align-items: center;
}
.row_control {
  width: 380rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1rpx solid #cecece;
  border-radius: 15rpx;
  overflow: hidden;
  background-color: #ffffff;
  padding: 0 20rpx;
  color: #666666;
}
.row_control input{
  flex-grow:1
}
picker {
  /* display: block; */
  width: 100%;
  height: 100%;
  position: relative;
}
.icon_down {
  width: 18rpx;
  height: 10rpx;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -5rpx;
}
.picker {
  height: 90rpx;
  width: 350rpx;
  line-height: 90rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text_content {
  background: #ffffff;
  height: 120rpx;
  width: 690rpx;
  border: 1rpx solid #cecece;
  border-radius: 15rpx;
  margin-top: 20rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
}
.text_content textarea {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15rpx;
  overflow-y: auto;
}
.icon_box {
  width: 230rpx;
  height: 220rpx;
  background-color: #eeeeee;
  margin-top: 20rpx;
  border: 1rpx solid #cecece;
  overflow: hidden;
  position: relative;
}
.icon_box view {
  height: 3rpx;
  width: 52rpx;
  background: #999999;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -1.5rpx;
  margin-left: -26rpx;
}
.icon_box view:first-of-type {
  transform: rotate(90deg);
}
.upload_content {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
}
.upload_content image {
  width: 100rpx;
  height: 90rpx;
  margin: 5rpx;
}
.upimg_wrap {
  width: 440rpx;
}

.submit {
  width: 690rpx;
  height: 90rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fc5a4f;
  font-size: 33rpx;
  margin-top: 90rpx;
  color: #ffffff;
}
.submit::after {
  border: none;
}
.text_box {
  display: inline-block;
  width: 80rpx;
  text-align: right;
}
.text_right {
  text-align: right;
}
</style>

<template>
  <view class="container">
   <form bindsubmit='submit'>
       <view class="row_box">
           <text class="row_title">职位</text>
           <view class="row_control">
         <picker mode="multiSelector" bindchange="bindMultiPickerChange" bindcolumnchange="bindMultiPickerColumnChange" value="{{multiIndex}}" range="{{multiArray}}" range-key='job_name'>
        <view class="picker">
      {{job_name}}
      </view>
      <image class="icon_down" src="../../images/down@2x.png" />
      </picker>
           </view>
       </view>
       

        <view class="row_box">
           <text class="row_title">请选择期望工作地区</text>
           <view class="row_control">
               <picker mode="region"  bindchange="bindRegionChange" value="{{city}}"  custom-item='不限'>
             <view class="picker">
              {{address}}
                </view>
                 <image class="icon_down" src="../../images/down@2x.png" />
            </picker>
           </view>
       </view>

        <view class="row_box">
           <text class="row_title">薪资</text>
           <view class="row_control">
               <input name="salary"  value="{{salary}}" bindinput="getSalary"/><text class="text_box">元/月</text>
           </view>
       </view>

        <view class="row_box">
           <text class="row_title">岗位工龄</text>
           <view class="row_control">
               <input name="exper"  value="{{exper}}" bindinput="getExper"/>
           </view>
       </view>


         <view class="row_box">
           <text class="row_title">姓名</text>
           <view class="row_control">
               <input name="name"  value="{{name}}" bindinput="getName"/>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">年龄</text>
           <view class="row_control">
               <input name="age"  value="{{age}}" bindinput="getAge"/>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">联系电话</text>
           <view class="row_control">
               <input name="telephone"  value="{{telephone}}" bindinput="getPhone"/> 
           </view>
       </view>

       <view class="multi_row">
           <text class="row_title">个人基本情况</text>
       <view class="text_content">
           <textarea name="info" value="{{info}}" bindinput="getInfo"></textarea>
       </view>
        </view>

        <button class="submit" formType='submit' disabled="{{isBan}}">发布</button>
   </form>
</view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class JobsForm extends wepy.page {
  config = {
    navigationBarTitleText: "求职发布"
  };
  data = {
    jobType:[],//工种
    city: [],//选择地区
    address:"",
    salary:"",//薪水
    exper:"",//工作经验
    name: "",//姓名
    age:"", //年龄
    telephone: "",//联系电话
    info: "",//基本情况
    //是否禁止提交按钮
    isBan: false,
    multiIndex:[0,0],
    multiArray: [],
    job_id:"",
    job_name:""
  };

  onLoad(options) {
    this.getJobType();
  }

  computed = {};

  components = {};

  methods = {
    bindRegionChange: e => {
      this.city = e.detail.value;
      // console.log(this.city)
      if(this.city[0]=="不限"){
        this.address="不限"
      }
      else if(this.city[1]=="不限"){
        this.address=this.city[0]
      }else if(this.city[2]=="不限"){
          this.address=this.city[1]
      }
      else{
        this.address=this.city[1]+this.city[2];
      }
    },
    getSalary:e=>(this.salary = e.detail.value),
    getExper:e=>(this.exper = e.detail.value),
    getAge:e=>(this.age = e.detail.value),
    getName: e => (this.name = e.detail.value),
    getPhone: e => (this.telephone = e.detail.value),
    getInfo: e => (this.info = e.detail.value),

 bindMultiPickerChange:e=>{
      console.log('picker发送选择改变，携带值为', e.detail.value)
        this.multiIndex = e.detail.value;
        this.job_id=this.multiArray[1][this.multiIndex[1]].job_id
        this.job_name=this.multiArray[1][this.multiIndex[1]].job_name
         console.log('job_id', this.job_id)
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
   

    //提交表单
    submit(e) {
      let v = e.detail.value;
      var telephone = /^[1][0-9][0-9]{9}$/;
      
       if (!this.job_id) {
        return wx.showToast({
          title: "职位不能为空!",
          icon: "none",
          duration: 1000
        });
      }
     
      if (!this.city.length > 0) {
        return wx.showToast({
          title: "请选择期望工作地区!",
          icon: "none",
          duration: 1000
        });
      }

      if (!v.salary) {
        return wx.showToast({
          title: "薪资不能为空!",
          icon: "none",
          duration: 1000
        });
      }

      if (!v.exper) {
        return wx.showToast({
          title: "岗位工龄不能为空!",
          icon: "none",
          duration: 1000
        });
      }


      if (!v.name) {
        return wx.showToast({
          title: "姓名不能为空!",
          icon: "none",
          duration: 1000
        });
      }

      if (v.telephone === "" || !telephone.test(v.telephone)) {
        return wx.showToast({
          title: "手机号格式不正确!",
          icon: "none",
          duration: 1000
        });
      }

      
       if (!v.info) {
        return wx.showToast({
          title: "个人基本情况不能为空!",
          icon: "none",
          duration: 1000
        });
      }


       this.isBan = true;
      wx.showLoading({
        title: "提交中"
        });
      this.postForm();
    }
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
      // this.job_id=this.jobType[0].child[0].job_id;
      this.multiArray=[[...this.jobType],[...this.jobType[0].child]]
      console.log(this.jobType);
      this.$apply();
  }	


  //上传信息
  async postForm() {
    const res = await shttp
      .post(`/api/v1/member/job`)
      .send({
        job_id:this.job_id,
        address:this.address,
        salary:this.salary,
        exper:this.exper,
        age:this.age,
        name: this.name,
        telephone: this.telephone,
        info:this.info
      })
      .end();
       wx.hideLoading();
    if (res.status == 0) {
      wx.showToast({
        title: "提交成功",
        icon: "success",
        duration: 1000
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }else {
      wx.showToast({
        title: "提交失败",
        icon: "none",
        duration: 1000
      });
      this.isBan = false;
    }
    this.$apply();
  }
}
</script>
