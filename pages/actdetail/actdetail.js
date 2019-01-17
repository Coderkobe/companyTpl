// pages/actdetail/actdetail.js
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imghost: util.imghost,
    actImage: '/images/act_detail_example.png',
    actName: '社区送温暖活动',
    actDate: '2018.10.01~2018.10.05',
    actAddress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      activityId: options.activityid
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
    this.fetchActivityDetail();
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
  fetchActivityDetail: function() {
    let _self = this;
    let activityId = _self.data.activityId;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/activity/${activityId}`,
      method: 'get',
      success: (res) => {
        console.log(res);
        let actDate = res.data.data['start_time'].split(' ')[0] + '~' + res.data.data['end_time'].split(' ')[0];
        _self.setData({
          actImage: res.data.data.cover,
          actName: res.data.data.title,
          actDate: actDate
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