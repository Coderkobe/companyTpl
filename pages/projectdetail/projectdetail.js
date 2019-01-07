const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
// pages/projectdetail/projectdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proId: '',
    content: '',
    imgHost: util.imghost
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      proId: options.proid
    });
    this.fetchProDetail(() => {
      let article = WxParse.wxParse('content', 'html', that.data.content, that, 5);
      that.setData({
        content: article
      })
    });
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    
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

  fetchProDetail: function(callback) {
    let _self = this;
    let proid = this.data.proId;
    util.permissionRequest({
      url: `${util.hostname}/api/project/${proid}`,
      data: {},
      method: 'get',
      success: (res) => {
        if (res.statusCode == 200) {
          _self.setData({
            content: res.data.data.content,
            coverPicture: res.data.data.cover,
            articleTitle: res.data.data.title
          })
        } else {
          _self.showToast(res.errMsg);
        }
        callback();
      },
      fail: (res) => {
        _self.showToast(res.errMsg);
      }
    })
  }
})