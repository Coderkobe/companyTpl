// pages/news/news.js
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    imghost: util.imghost
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
    this.fetchNewsList();
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

  },

  fetchNewsList: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/feed`,
      method: 'get',
      success: (res) => {
        console.log(res);
        let newsList  = res.data.data.data;
        newsList.forEach(element => {
          if (element['feedable_type'].indexOf('Activity') != -1) {
            element.type = 'activity';
          } else {
            element.type = 'news';
          }
          element.date = element['created_at'].split(' ')[0];
        });
        _self.setData({
          newsList: newsList
        })
        console.log(_self.data.newsList);
      },
      fail: (res) => {

      }
    })
  },
  navigateToNewsDetail: function(e) {
    let newsId = e.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: '/pages/newsdetail/newsdetail?newsid=' + newsId,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  navigateToActivityDetail: function(e) {
    let activityId = e.currentTarget.dataset.activityid;
    wx.navigateTo({
      url: '/pages/actdetail/actdetail?activityid=' + activityId,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})