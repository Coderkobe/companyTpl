//index.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    $toast: {
      show: false,
      text: '',
      icon: ''
    },
    imghost: util.imghost,
    hidden: true,
    newsList: [
      
    ],
    serviceList: [

    ],
    caseList: [
      
    ],
    slideImages: []
  },
  
  onLoad: function () {
    
  },
  onShow: function() {
    this.fetctServiceList();
    this.fetchCaseList();
    this.fetchNewsList();
    this.fetchSlideList();
  },
  getUserInfo: function(e) {
    let _self = this;
    util.login((sk) => {
      util.getUserInfo(sk, () => {
        wx.getStorage({
          key: 'ch_isLogin',
          success: (res) => {
            if (res.data) {
              _self.setData({
                isLogin: true
              })
              // _self.hidePopup();
              // wx.showTabBar({});
            }
          }
        })
      });
    });
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
  },
  onGotUserInfo: function(e) {
    console.log(e)
  },
  loadingChange: function () {
    this.setData({
      hidden: true
    })
  },
  loadingTap: function () {
    this.setData({
      hidden: false
    })

    var that = this
    setTimeout(function () {
      that.setData({
        hidden: true
      })
    }, 1500)
  },

  // 获取主营业务
  fetctServiceList: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/business`,
      method: 'get',
      success: (res) => {
        let serviceList  = res.data.data;
        _self.setData({
          serviceList: serviceList
        })
      },
      fail: (res) => {

      }
    })
  },

  // 获取合作案例
  fetchCaseList: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/project`,
      method: 'get',
      success: (res) => {
        let caseList  = res.data.data;
        _self.setData({
          caseList: caseList
        })
      },
      fail: (res) => {

      }
    })
  },

  //获取信息列表 
  fetchNewsList: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/article`,
      method: 'get',
      success: (res) => {
        let newsList  = res.data.data;
        _self.setData({
          newsList: newsList
        })
      },
      fail: (res) => {

      }
    })
  },

  // 获取首页轮播
  fetchSlideList: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/${util.app_id}/slide`,
      method: 'get',
      success: (res) => {
        let slideImages  = res.data.data;
        _self.setData({
          slideImages: slideImages
        })
      },
      fail: (res) => {

      }
    })
  }
})
