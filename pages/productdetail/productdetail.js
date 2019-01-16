// pages/productdetail/productdetail.js
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imghost: util.imghost,
    imgUrls: [
      '/images/pdetail.png',
      '/images/pdetail.png'
    ],
    productName: '小程序：参上名片',
    productDetail: '￥999'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productId: options.productid
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
    this.fetchProductDetail();
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

  fetchProductDetail: function() {
    let _self = this;
    let productId = _self.data.productId;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/product/${productId}`,
      method: 'get',
      success: (res) => {
        _self.setData({
          imgUrls: [`${res.data.data.cover}`],
          productName: res.data.data.title,
          productDetail: res.data.data.price
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