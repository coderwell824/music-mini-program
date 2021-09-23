import requests from "../../utils/request.js"
import PubSub, { publish } from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dailySongs:[],
    index:0  //点击歌曲的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendSong();

    //订阅songDetail发布的type信息

   PubSub.subscribe("type",(msg,switchType)=>{   //msg是传递过来的消息名, data是传递过来的消息数据
    let {dailySongs,index}=this.data;
      if(switchType==="next"){
        if(index<dailySongs.length-1){
          index+=1;
        }else{
          index=0;
        } 
      }else{
        if(index>0){
          index-=1;
        }else{
          index=dailySongs.length-1;
        }
      }

      this.setData({index})
      let musicId=dailySongs[index].id;
      PubSub.publish("musicId",musicId);
   });
  },
 

  async getRecommendSong(){
    const res=await requests("/recommend/songs")
    this.setData({
      dailySongs:res.recommend
    })
  },
  toSongDetail(event){
    let {id,index}=event.currentTarget.dataset;
    this.setData({
      index
    })
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?id='+id,  //传递对象的时候需要进行转JSON格式  传参内容不能过长
    })
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