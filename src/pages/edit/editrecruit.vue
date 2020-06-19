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

.text_right {
  text-align: right;
}
.text_box {
  display: inline-block;
  width: 80rpx;
  text-align: right;
}
</style>

<template>
  <view class="container">
   <form bindsubmit='submit'>

      <view class="row_box">
           <text class="row_title">企业名称</text>
           <view class="row_control">
               <input  name="comName" value="{{comName}}" bindinput="getComName"/>
           </view>
       </view>

 
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
           <text class="row_title">请选择地区</text>
           <view class="row_control">
               <picker mode="region"  bindchange="bindRegionChange" value="{{city}}" >
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
           <text class="row_title">工作经验要求</text>
           <view class="row_control">
               <input name="exper"  value="{{exper}}" bindinput="getExper"/>
           </view>
       </view>


    <view class="row_box">
           <text class="row_title">招聘人数</text>
           <view class="row_control">
               <input name="nums" type="number" value="{{nums}}" bindinput="getNums"/>
           </view>
       </view>
         <view class="row_box">
           <text class="row_title">联系人</text>
           <view class="row_control">
               <input name="name"  value="{{name}}" bindinput="getName"/>
           </view>
       </view>

       <view class="row_box">
           <text class="row_title">联系电话</text>
           <view class="row_control">
               <input name="telephone"  value="{{telephone}}" bindinput="getPhone"/> 
           </view>
       </view>

       <view class="multi_row">
           <text class="row_title">企业简介</text>
       <view class="text_content">
           <textarea name="com_introduce" value="{{com_introduce}}" bindinput="getIntroduce"></textarea>
       </view>
        </view>

        <view class="multi_row">
           <text class="row_title">职位描述</text>
       <view class="text_content">
           <textarea name="job_desc" value="{{job_desc}}" bindinput="getJobdesc"></textarea>
       </view>
        </view>
    

        <button class="submit" formType='submit' disabled="{{isBan}}">发布</button>
   </form>
</view>
</template>

<script>
import wepy from "wepy";
import { shttp } from "../../utils/http";
export default class EditRecruit extends wepy.page {
  config = {
    navigationBarTitleText: "修改招聘"
  };
  data = {
    comName:"", //企业名称
    jobType:[],//工种
    city: [],//选择地区
    salary:"",//薪水
    exper:"",//工作经验
    nums:"",//招聘人数
    name: "",//姓名
    telephone: "",//联系电话
    com_introduce: "",//企业简介
    job_desc: "",//职位描述
    //是否禁止提交按钮
    isBan: false,
    multiIndex:[0,0],
    multiArray: [],
    job_id:"",
    member_type:"",
     id:"", //详情id
    info:"",//详情信息
    address:"",
    job_name:""
  };

  onLoad(options) {
     this.id=options.id;
    console.log("获取id值："+this.id)
    this.getDetails();
    this.getJobType();
  }

  computed = {};

  components = {};

  methods = {
    getComName: e => (this.comName = e.detail.value),
    bindRegionChange: e => (this.city = e.detail.value,this.address=this.city[1] + this.city[2]),
    getSalary:e=>(this.salary = e.detail.value),
    getExper:e=>(this.exper = e.detail.value),
    getNums:e=>(this.nums = e.detail.value),
    getName: e => (this.name = e.detail.value),
    getPhone: e => (this.telephone = e.detail.value),
    getIntroduce: e => (this.com_introduce = e.detail.value),
    getJobdesc: e => (this.job_desc = e.detail.value),

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
       if (!this.comName) {
        return wx.showToast({
          title: "企业名称不能为空!",
          icon: "none",
          duration: 1000
        });
      }
       if (!this.job_id) {
        return wx.showToast({
          title: "职位不能为空!",
          icon: "none",
          duration: 1000
        });
      }
     
      if (!this.address) {
        return wx.showToast({
          title: "请选择地区!",
          icon: "none",
          duration: 1000
        });
      }

      if (!this.salary) {
        return wx.showToast({
          title: "薪资不能为空!",
          icon: "none",
          duration: 1000
        });
      }

      if (!this.exper) {
        return wx.showToast({
          title: "工作经验要求不能为空!",
          icon: "none",
          duration: 1000
        });
      }
        if (!this.nums) {
        return wx.showToast({
          title: "招聘人数不能为空!",
          icon: "none",
          duration: 1000
        });
      }


      if (!this.name) {
        return wx.showToast({
          title: "联系人不能为空!",
          icon: "none",
          duration: 1000
        });
      }

      if (this.telephone === "" || !telephone.test(this.telephone)) {
        return wx.showToast({
          title: "手机号格式不正确!",
          icon: "none",
          duration: 1000
        });
      }

      
       if (!this.com_introduce) {
        return wx.showToast({
          title: "企业简介不能为空!",
          icon: "none",
          duration: 1000
        });
      }

       if (!this.job_desc) {
        return wx.showToast({
          title: "职位描述不能为空!",
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

//获取信息
 async getDetails() {
    const res = await shttp
      .get(`/api/v1/company/info`)
      .query({
        id: this.id
      })
      .end();
    if (res.status === 0) {
      if (!res.data) {
        wx.showToast({
          title: "暂无数据",
          icon: "none",
          duration: 1000
        });
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
      //数据处理显示
       this.info = res.data;
       this.comName=this.info.com_name;
        this.address=this.info.address;
        this.job_name=this.info.job_name;
        this.job_id=this.info.job_id;
        this.salary=this.info.salary;
        this.exper=this.info.exper;
        this.nums=this.info.nums;
        this.name=this.info.name;
        this.telephone=this.info.telephone;
        this.com_introduce=this.info.com_introduce;
        this.job_desc=this.info.job_desc;
        wx.hideLoading();
    } else {
      wx.hideLoading();
    }
    this.$apply();
  }

  //上传信息
  async postForm() {
    const res = await shttp
      .put(`/api/v1/company`)
      .send({
        com_name:this.comName,
        job_id:this.job_id,
        address: this.address,
        salary:this.salary,
        exper:this.exper,
        nums:this.nums,
        name: this.name,
        telephone: this.telephone,
        com_introduce: this.com_introduce,
        job_desc:this.job_desc,
        id:this.id
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
