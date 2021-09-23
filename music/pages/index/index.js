import requests from "../../utils/request.js"

Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],//轮播图的数据
    recommendList:[],  //推荐歌曲
    paihangbang:[]     //排行榜
  },

 async getInitData(){
    let res= await requests(`/banner`,{type:2});
    this.setData({
      banners:res.banners
    })

    res=await requests("/personalized");  //res可以反复使用
    this.setData({
      recommendList:res.result
    })
    let index=0;
    let resultArr=[];
    while(index<5){
      res=await requests("/top/list",{idx:index++});
      let obj={
        name:res.playlist.name,
        song:res.playlist.tracks
      }
      resultArr.push(obj); 
    }
    //统一更新: 1.优点:减少更新的次数 2.缺点:网络较差时候用户等待时间过长,可能看到白屏
    //实时更新 : 1.优点:用户等待时间较短 2.缺点: 多次更新页面

    this.setData({
      paihangbang:resultArr
    })
  },
  recommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },
  goRanking(){
      wx.navigateTo({
        url: '/pages/ranking/ranking',
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:  function (options) {
    this.getInitData()
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


