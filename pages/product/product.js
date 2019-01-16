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

  transferDate: function(str) {
    let date = (str.match(/\S*/)[0]).split('-');
    let year = date[0];
    let month = +date[1];
    let day = +date[2];
    return `${year}年${month}月${day}日`;
  },
  // 获取活动列表
  fetchActList: function() {
    let _self = this;
    util.permissionRequest({
      url: `${util.hostname}/api/activity`,
      data: {},
      method: 'get',
      success: (res) => {
        if (res.statusCode == 200) {
          res.data.data.data.forEach(element => {
            element.startTime = _self.transferDate(element['start_time']);
            element.endTime = _self.transferDate(element['end_time']);
            element.same = element.startTime === element.endTime ? true : false;
          });
          _self.setData({
            actList: res.data.data.data
          })
          // 如果有列表，无数据模块不展示，否则展示无数据模块
          if (_self.data.actList.length == 0) {
            this.setData({
              noActList: true
            });
          } else {
            this.setData({
              noActList: false
            });
          }
        } else {
          _self.showToast(res.errMsg);
        }
      },
      fail: (res) => {
        _self.showToast(res.errMsg);
      }
    })
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