const util = require('../../utils/util.js');
const app = getApp();
// pages/alldon/alldon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    donList: [],
    amount: '',
    donationCount: ''
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
    let _self = this;
    _self.setData({
      'amount': wx.getStorageSync('amount'),
      'donationCount': wx.getStorageSync('donationCount')
    })
    _self.fetchAllDon();
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
  fetchAllDon: function() {
    let _self = this;
    util.permissionRequest({
      url: `${util.hostname}/api/profile/donation`,
      method: 'get',
      data: {},
      success: (res) => {
        res.data.data.data.forEach(element => {
          element.date = element['created_at'].match(/\S*/)[0];
        });
        _self.setData({
          donList: res.data.data.data
        })
      },
      fail: (res) => {

      }
    })
  }
})