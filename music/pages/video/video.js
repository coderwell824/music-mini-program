import requests from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    isActiveId:58100,
    videoList:[],
    videoId:"",  
    videoUpdateTime:[],  //记录实时播放的时长
    isTriggered:false   //标识下拉刷新是否被触发
  },
  handleTabs(event){
    this.setData({
      isActiveId:event.currentTarget.dataset.id,
      videoList:[]
    })
    wx.showLoading({
      title: '正在加载',
    })
    this.getVideoList(this.data.isActiveId)
  },
  async getVideoList(navId){
    let videoListData=await requests("/video/group",{id:navId});
    wx.hideLoading()
    this.setData({
      videoList:videoListData.datas,
      isTriggered:false
    })
  },

  
  async getNavList(){
    let result=await requests("/video/group/list");
    this.setData({
      navList:result.data
    })
    this.getVideoList(this.data.isActiveId)
  },
  handlePlay(event){
    let vid=event.currentTarget.id;
  
   //  this.videoContext && this.vid !==vid && this.videoContext.stop();  
   //有video的情况下,先判断前面的内容,false的话不执行stop函数   解决多个视频同时播放的问题
     this.vid=vid;

     this.videoContext= wx.createVideoContext(vid); //创建视频的上下文对象

     this.setData({
       videoId:vid
     })
     
    let {videoUpdateTime}=this.data;
    let videoItem=videoUpdateTime.find(item=>item.vid===vid)  //根据videoItem来判断是更新还是添加
     if(videoItem){  //判断当前是否有播放时间记录
      this.videoContext.seek(videoItem.currentTime)
     }else{
      this.videoContext.play() //从头播放当前视频
     }

   
  },
  handleTimeUpdate(event){   //视频播放进度实时变化的回调
      let videoTimeObj={vid:event.currentTarget.id,currentTime:event.detail.currentTime}
      let {videoUpdateTime}=this.data;
      let videoItem=videoUpdateTime.find(item=>item.vid===event.currentTarget.id)  //根据videoItem来判断是更新还是添加
    if(videoItem){
      videoItem.currentTime=event.detail.currentTime;
    }else{
      videoUpdateTime.push(videoTimeObj)
    }

    this.setData({
      videoUpdateTime
    })
    

  },
  handleEnd(event){
    let {videoUpdateTime}=this.data;
    let videoItemIndex=videoUpdateTime.findIndex(item=>item.vid===event.currentTarget.id);
    videoUpdateTime.splice(videoItemIndex,1);
    this.setData({
      videoUpdateTime
    })
  },
  handleRefersher(){   //上拉加载
    this.getVideoList(this.data.isActiveId);
  },
  handleTolower(){   //下拉触底刷新
  
  },
  goSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

   onLoad() {
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
   onShow() {
    this.getNavList();
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
  onShareAppMessage: function ({from}) {
     
  }
})