//app.js
App({
  onLaunch: function (res) {
    // 自定义导航栏相关
    // if (res.scene == 1007 || res.scene == 1008) {
    //   this.globalData.share = true
    // } else {
    //   this.globalData.share = false
    // }
    // wx.getSystemInfo({
    //   success: (res) => {
    //     this.globalData.height = res.statusBarHeight
    //   }
    // })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})