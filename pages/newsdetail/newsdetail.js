// pages/newdetail/newsdetail.js
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsTitle: '树熊校园微信小程序上线啦！',
    newsDate: '2018.11.10'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      newsId: options.newsid
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
    this.fetchNewsDetail();
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

  fetchNewsDetail: function() {
    let _self = this;
    let newsId = _self.data.newsId;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/article/${newsId}`,
      method: 'get',
      success: (res) => {
        console.log(res);
        _self.setData({
          newsTitle: res.data.data.title
        })
        let article = WxParse.wxParse('content', 'html', res.data.data.content, _self, 5);
        if (article != undefined) {
          _self.setData({
            content: article
          })
        }
      },
      fail: (res) => {

      }
    })
  }
})