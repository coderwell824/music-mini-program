let startY=0; //手指起始坐标
let moveY=0; //手指移动实时的坐标
let moveDistance=0; //手指移动的距离
import requests from "../../utils/request.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    move:"translateY(0)",
    coverTranstion:"",
    userInfo:{
      nickname:"游客",
      avatarUrl:"/static/images/personal/missing-face.png",
      followed:true
    },
    recentPlay:[]

  },
  handleTouchStart(event){
      //获取手指起始坐标
      this.setData({
        coverTranstion:""
      })
      startY=event.touches[0].clientY;
  },
  handleTouchMove(event){
      moveY=event.touches[0].clientY;
      moveDistance=moveY-startY;
      if(moveDistance>200||moveDistance<0){
        return
      }
      this.setData({
        move:`translateY(${moveDistance}rpx)`
      })
  },
  handleTouchEnd(){
    this.setData({
      move:`translateY(0)`,
      coverTranstion:" all 1s linear"
    })
    
  },
  toLogin(){
    if(this.data.userInfo.followed){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
   
  },
  remove(){
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('cookies');
    wx.reLaunch({
      url: '/pages/center/center',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    let userInfo=wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo
      })
      let result=await requests("/user/record",{
        uid:this.data.userInfo.userId,
        type:1
      })
      this.setData({
        recentPlay:result.weekData
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})