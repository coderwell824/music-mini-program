 import requests from "../../utils/request.js"
 import PubSub from 'pubsub-js'
 import moment from "moment"
 //获取全局App实例
 let appInstance = getApp();
 let backgroundAudioManager = wx.getBackgroundAudioManager(); //生成背景音频的实例

 Page({

   /**
    * 页面的初始数据
    */
   data: {
     isPlay: false,
     songList: [],
     songUrl: "",
     songId: "",
     currentTime:"00:00",  //实时播放的时长
     durationTime:"",   //总时长
     currentWidth:""
    
   },
   //点击播放/暂停的回调
   handleMusicPlay() {
     let isPlay =! this.data.isPlay;

     this.musicControl(isPlay);
    //  this.setData({
    //    isPlay
    //  })
   },
   //封装控制音乐播放/暂停的功能函数
   musicControl(isPlay) {
     const { songUrl} = this.data;
   
     if (isPlay) {
       backgroundAudioManager.src = songUrl;
       backgroundAudioManager.title = this.data.songList[0].name;

       //修改全局的播放状态
      //  appInstance.globalData.isMusicPlay = true;
      //  appInstance.globalData.musicId = songId;

     } else {
       backgroundAudioManager.pause();
      //  appInstance.globalData.isMusicPlay = false;
     }
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     //options: 用来接收路由跳转的参数, 默认是空对象
     //JSON.parse将json对象编译成js对象
     //注意: 原生小程序url有长度限制,如果传参内容过长会自动截取掉
     let id = options.id;
     this.setData({
       songId: id
     })
     this.getSongDetail(id);
     this.getSongUrl(id);

     //监听音乐的播放/暂停/停止
     backgroundAudioManager.onPlay(()=>{
      this.changeIsPlayState(true);
        appInstance.globalData.musicId=id;
     });

     backgroundAudioManager.onPause(()=>{
       this.changeIsPlayState(false);

     });

     backgroundAudioManager.onStop(()=>{
      this.changeIsPlayState(false);
     })

     backgroundAudioManager.onTimeUpdate(()=>{  //监听时间
        let currentTime=moment(backgroundAudioManager.currentTime*1000).format("mm:ss");
        let currentWidth=backgroundAudioManager.currentTime / backgroundAudioManager.duration * 450; //时间比例=长度比例
      
        this.setData({ 
          currentTime,
          currentWidth
        })
     })
     backgroundAudioManager.onEnded(()=>{
      PubSub.publish("type","next"); 
      this.setData({
        currentTime:"00:00",  
        durationTime:"",   
        currentWidth:""
      })
     })

     PubSub.subscribe("musicId",(msg,musicId)=>{
      this.getSongDetail(musicId);
      this.musicControl(true);
     
    })
   },

   //封装修改状态的功能函数
   changeIsPlayState(isPlay){
    this.setData({
      isPlay
    })
    appInstance.globalData.isMusicPlay=isPlay;
   },
   handleSwitch(event){   //切换歌曲
  
      let type =event.currentTarget.id;

      backgroundAudioManager.stop();


      //将切换歌曲
      PubSub.publish("type",type); 

      
   },


   async getSongDetail(ids) {
     let res = await requests("/song/detail", {ids});
     let durationTime=moment(res.songs[0].dt).format("mm:ss");

     this.setData({
       songList: res.songs,
       durationTime
     })
   },
   async getSongUrl(id) {
     let res = await requests("/song/url", {id});
     
     this.setData({
       songUrl: res.data[0].url
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
     const {songId}=this.data;
     //判断当前页面是否在播放
     if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === songId) {
       this.setData({
         isPlay: true
       })
     } else{
      this.setData({
        currentWidth:""
      })
       backgroundAudioManager.stop();
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