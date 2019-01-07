const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
// pages/activitydetail.js
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
    actId: '',
    imgHost: util.imghost,
    registered: false,
    scene: '',
    content: '',
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(`------options-----`);
    console.log(options);
    this.setData({
      isLogin: wx.getStorageSync('ch_isLogin') ? true : false
    })
    if (options.scene != undefined) {
      this.setData({
        scene: options.scene
      });
    }
    if (options.actid != undefined) {
      this.setData({
        actId: options.actid
      });
    }
    
    // this.fetchActDetail();
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
    let that = this;
    // 获取活动详情
    that.fetchActDetail((str) => {
      let article = WxParse.wxParse('content', 'html', str, that, 5);
      if (article != undefined) {
        that.setData({
          content: article
        })
      }
    });
    // 获取报名状态
    that.fetchRegistrationstatus();
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
  onShareAppMessage: function (res) {
    let _self = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    // scene == 1000, 场景值为1000是表示是转发的页面
    return {
      title: _self.data.articleTitle,
      path: `/pages/activitydetail/activitydetail?actid=${_self.data.actId}&scene=1000`,
      imageUrl: `${_self.data.imgHost}${_self.data.coverPicture}`
    }
  },

  transferDate: function(str) {
    let date = (str.match(/\S*/)[0]).split('-');
    let year = date[0];
    let month = +date[1];
    let day = +date[2];
    return `${year}年${month}月${day}日`;
  },

  fetchActDetail: function(callback) {
    let _self = this;
    let id = this.data.actId;
    util.permissionRequest({
      url: `${util.hostname}/api/activity/${id}`,
      data: {},
      method: 'get',
      success: (res) => {
        if (res.statusCode == 200) {
          res.data.data.startTime = _self.transferDate(res.data.data['start_time']);
          res.data.data.endTime = _self.transferDate(res.data.data['end_time']);
          res.data.data.same = res.data.data.startTime === res.data.data.endTime ? true : false;
          _self.setData({
            // content: res.data.data.content,
            coverPicture: res.data.data.cover,
            articleTitle: res.data.data.title,
            status: res.data.data.status,
            address: res.data.data.address,
            enrolment: res.data.data.enrolment,
            duration: res.data.data.duration,
            startTime: res.data.data.startTime,
            endTime: res.data.data.endTime,
            same: res.data.data.same,
          })
          console.log(_self.data);
        } else {
          _self.showToast(res.errMsg);
        }
        callback(res.data.data.content);
      },
      fail: (res) => {
        _self.showToast(res.errMsg);
      }
    })
  },
  // 报名接口
  signUp: function() {
    let _self = this;
    util.permissionRequest({
      url: `${util.hostname}/api/activity/register`,
      method: 'post',
      data: {
        'activity_id': _self.data.actId
      },
      success: (res) => {
        console.log(res)
        // 报名成功
        if(res.data.code == 200) {
          _self.showToast(res.data.message, 'yes');
          _self.fetchRegistrationstatus();
        }
        // 未注册为志愿者
        if (res.data.code == 402) {
          console.log(`未注册为志愿者`)
          _self.showToast(res.data.message, 'no');
          wx.navigateTo({
            url: '/pages/register/register'
          })
        }
        // 请勿重复报名
        if (res.data.code == 400) {
          _self.showToast(res.data.message, 'no');
        }
      },
      fail: (res) => {
        console.log(res)
      }
    },() => {
      wx.clearStorageSync();
      _self.setData({
        isLogin: false
      })
    });
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
  fetchRegistrationstatus: function(callback) {
    let _self = this;
    util.permissionRequest({
      url: `${util.hostname}/api/activity/${_self.data.actId}/judge`,
      method: 'get',
      success: (res) => {
        if (res.data.code == 200 && res.data.message == '已报名') {
          _self.setData({
            registered: true
          })
          callback && callback();
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  navigateToIndex: function() {
    console.log(`--------跳转到首页--------`);
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  getUserInfo: function() {
    let _self = this;
    // sk = session_key;
    if (_self.data.isLogin) {
      _self.signUp();
    } else {
      util.login((sk) => {
        util.getUserInfo(sk, () => {
          wx.getStorage({
            key: 'ch_isLogin',
            success: (res) => {
              if (res.data) {
                _self.setData({
                  isLogin: true
                });
                _self.signUp();
              }
            }
          })
        });
      });
    }
  },
})