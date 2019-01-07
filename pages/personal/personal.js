
const util = require('../../utils/util.js');

// pages/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unauthorized: true, //是否为志愿者的标志位
    volunteer: {},
    statistics: {},
    activity: null,
    donation: null,
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLogin: wx.getStorageSync('ch_isLogin') ? true : false
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
    this.fetchProfile();
    this.fetchActDon();
    // this.scanQrode();
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

  getUserInfo: function() {
    let _self = this;
    // sk = session_key;
    if (_self.data.isLogin) {
      _self.fetchProfile(() => {
        // 判断是否已注册为志愿者
        if (wx.getStorageSync('isVolunteer')) {
          
        } else {
          wx.navigateTo({
            url: '/pages/register/register'
          })
        }
      });
      _self.fetchActDon();
    } else {
      util.login((sk) => {
        util.getUserInfo(sk, () => {
          wx.getStorage({
            key: 'ch_isLogin',
            success: (res) => {
              if (res.data) {
                _self.setData({
                  isLogin: true
                })
  
                _self.fetchProfile(() => {
                  // 判断是否已注册为志愿者
                  if (wx.getStorageSync('isVolunteer')) {
                    
                  } else {
                    wx.navigateTo({
                      url: '/pages/register/register'
                    })
                  }
                });
                _self.fetchActDon();
              }
            }
          })
        });
      });
    }
  },

  fetchProfile: function(callback) {
    let _self = this;
    util.permissionRequest({
      url: `${util.hostname}/api/profile`,
      method: 'get',
      success: (res) => {
        // 是否为志愿者
        wx.setStorageSync('isVolunteer', true);

        // 是否有志愿者数据，有的话为志愿者，否则不是
        if (res.data.data.volunteer == null) {
          _self.setData({
            unauthorized: true
          })
        } else {
          _self.setData({
            unauthorized: false,
            volunteer: res.data.data.volunteer,
            statistics: res.data.data.statistic,
            avatar: res.data.data.avatar,
            nickname: res.data.data.nickname
          })

          // 用户姓名
          wx.setStorageSync('name', res.data.data.volunteer['name']);
          // 用户身份证号
          wx.setStorageSync('idNumber', res.data.data.volunteer['id_number']);
          // 用户手机号
          wx.setStorageSync('mobile', res.data.data.volunteer['mobile']);
        }

        if (res.data.data.statistic != null) {
          // 捐款总金额
          wx.setStorageSync('amount', res.data.data.statistic['donation_amount']);
          // 捐款次数
          wx.setStorageSync('donationCount', res.data.data.statistic['donation_count']);
          // 活动次数
          wx.setStorageSync('acaivityCount', res.data.data.statistic['activity_count']);
          // 活动总时长
          wx.setStorageSync('duration', res.data.data.statistic['duration']);
        }
     
        callback && callback();
      }, 
      fail: () => {

      }
    })
  },

  fetchActDon: function() {
    let _self = this;
    util.permissionRequest({
      url: `${util.hostname}/api/profile/preview`,
      method: 'get',
      success: (res) => {
        if (res.data.data.donation != null) {
          res.data.data.donation.date = res.data.data.donation['created_at'].match(/\S*/)[0];
        }
        if (res.data.data.activity != null) {
          res.data.data.activity.date = res.data.data.activity['created_at'].match(/\S*/)[0];
        }
        _self.setData({
          activity: res.data.data.activity,
          donation: res.data.data.donation
        })
      }, 
      fail: () => {

      }
    },() => {
      wx.clearStorageSync();
      _self.setData({
        isLogin: false
      })
    });
  },

  scanQrode: function() {
    let _self = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        util.permissionRequest({
          url: `${util.hostname}/api/activity/${res.result}/sign`,
          method: 'post',
          success: (res) => {
            if (res.data.code == 200) {
              _self.showToast(res.data.message, 'yes');
              _self.fetchProfile();
            } else {
              _self.showToast(res.data.message, 'no');
            }
          },
          fail: (res) => {

          }
        })
      }
    })
  },
  navigateToEdit: function() {
    wx.navigateTo({
      url: '/pages/editperson/editperson'
    })
  },

  showToast(text, icon) {
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
    }, 1500)
  }
})