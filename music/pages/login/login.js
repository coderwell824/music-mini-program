/* 
  1.收集表单数据
  2.前端验证
    1) 验证用户信息是否合法(账号,密码的格式)
    2)前端验证不通过,提示用户内容不合法,不需要发请求进行后台验证
    3)前台验证通过,发请求(账号,密码)进行后台验证
  3.后台验证
    1)验证当前用户是否存在
    2)如果用户不存在,直接返回登录失败(该用户不存在)
    3)该用户存在, 需要验证密码是否正确
    4)密码不正确,返回给前端,并提示密码不正确
    5)密码正确,返回登录成功数据
*/
import requests from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: "",

  },
  async toLogin() {
    let {
      phone,
      password
    } = this.data;
    /* 
      手机号验证
      1.内容为空
      2.手机号格式不正确
      3.手机格式正确,验证通过
    */
   
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        image: "/static/images/alert.png",
        duration: 2000,
        mask: true
      })
      return
    } else {

      let phoneReg = /^1(3|5|6|7|8|9)\d{9}$/;
      if (!phoneReg.test(phone)) {
        wx.showToast({
          title: '手机号格式错误',
          image: "/static/images/alert.png",
          duration: 2000
        })
        return
      } else {
        if (!password) {
          wx.showToast({
            title: '密码不能为空',
            image: "/static/images/alert.png",
            duration: 2000
          })
          return
        } else {
          let result = await requests("/login/cellphone", {
            phone,
            password,
            isLogin:true
          });
          if (result.code === 200) {
            wx.showToast({
              title: '登录成功',
              image: "/static/images/success.png"
            })
            wx.setStorageSync('userInfo',result.profile);
           
            wx.switchTab({   //跳转至个人中心
              url: '/pages/center/center',
            })
          } else {
            wx.showToast({
              title: '手机或密码错误',
              image: "/static/images/alert.png"
            })
          }
        }
      }
    }

  },
  goRegister(){
    wx.navigateTo({
      url: '/pages/register/register',
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
  onShow: function () {

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