const util = require('../../utils/util.js');
const app = getApp();
// pages/editperson/editperson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    $toast: {
      show: false,
      text: '',
      icon: ''
    },
    name: '',
    phone: '',
    id: '',
    address: '',
    birthday: '',
    workplace: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: wx.getStorageSync('name'),
      phone: wx.getStorageSync('mobile'),
      id: wx.getStorageSync('idNumber')
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
  userInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  phoneInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  idInput: function(e) {
    this.setData({
      'id_number': e.detail.value
    })
  },
  birthInput: function(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  mechanismInput: function(e) {
    this.setData({
      workplace: e.detail.value
    })
  },
  addressInput: function(e) {
    this.setData({
      address: e.detail.value
    })
  },

  onSubmit: function() {
    let _self = this;
    if (_self.data.name.length < 2) {
      _self.showToast('请输入正确的用户名');
      return false;
    } 
    if (!util.verifyId(_self.data.id)) {
      _self.showToast('请输入正确的身份证号码');
      return false;
    }
    if (!util.verifyMobile(_self.data.phone)) {
      _self.showToast('请输入正确的手机号码');
      return false;
    }
    util.permissionRequest({
      url: `${util.hostname}/api/user/volunteer`,
      data: {
        name: this.data.name,
        mobile: this.data.phone,
        'id_number': this.data.id,
        address: this.data.address,
        birthday: this.data.birthday,
        workplace: this.data.workplace
      },
      success: (res) => {
        _self.showToast(res.data.message, 'yes');
      },
      fail: (res) => {

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
  }
})