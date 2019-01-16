const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
// pages/casedetail/casedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/pdetail.png',
      '/images/pdetail.png'
    ],
    productName: '小程序：参上名片',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      caseId: options.caseid
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
    let _self = this;
    _self.fetchCaseDetail();
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

  fetchCaseDetail: function() {
    let _self = this;
    let caseId = _self.data.caseId;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/project/${caseId}`,
      method: 'get',
      success: (res) => {
        _self.setData({
          coverPicture: res.data.data.cover,
          articleTitle: res.data.data.title
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