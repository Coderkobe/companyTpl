const util = require('../../utils/util.js')
const app = getApp()
// pages/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $toast: {
      show: false,
      text: ''
    },
    actList: [],
    imghost: util.imghost,
    noActList: false,
    productList: [
      
    ]
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
    this.fetchProductList();
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

  showToast: function(text, icon) {
    this.setData({
      $toast: {
        show: true,
        text: text,
        icon: icon
      }
    })
    setTimeout(() => {
        this.setData({
        $toast: {
          show: false
        }
      })
    }, 2500)
  },

  // 获取产品列表
  fetchProductList: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/product`,
      method: 'get',
      success: (res) => {
        let productList  = res.data.data;
        _self.setData({
          productList: productList
        })
      },
      fail: (res) => {

      }
    })
  }
})