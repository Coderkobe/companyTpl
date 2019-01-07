const util = require('../../utils/util.js')
const app = getApp()
// pages/donation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    imgUrls: [
      'https://xcx-chunshan.kejishuihua.com/storage/images/d49cf043c59c767639d205809cc5c407.jpg',
      'https://xcx-chunshan.kejishuihua.com/storage/images/51815a571504ac3b65dfa1792a0683b7.jpg',
      'https://xcx-chunshan.kejishuihua.com/storage/images/d52595bf1b82a0659087572867d22b95.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    sum: '5',
    donor: '',
    donorList: [],
    phoneInputIsShow: false,
    remark: '',
    amountTxt: '',
    isLogin: false,
    donatBtnDisabled: false
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
    // 获取捐赠列表
    this.fetchDonationList();
    // 获取统计数据
    this.fetchStatistic();
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
  // 金额输入
  amountInput: function(e) {
    if (e.detail.value) {
      this.setData({
        sum: e.detail.value,
        amountTxt: e.detail.value
      })
    }
    
    if (this.data.sum < 100) {
      this.setData({
        phoneInputIsShow: false
      })
    } else {
      this.setData({
        phoneInputIsShow: true
      })
    }
  },
  // 姓名输入
  nameInput: function(e) {
    this.setData({
      donor: e.detail.value
    })
  },
  // 电话号码输入
  phoneInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  // 地址输入
  addressInput: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  // 获取捐赠者信息
  fetchDonorInfo: function(callback) {
    let _self = this;
    util.permissionRequest({
      url: `${util.hostname}/api/donation`,
      data: {
        donor: this.data.donor,
        sum: (+this.data.sum).toFixed(1),
        mobile: this.data.mobile,
        address: this.data.address
      },
      success: (res) => {
        callback(res.data.data);
      },
      fail: (res) => {

      }
    }, () => {
      wx.clearStorageSync();
      _self.setData({
        isLogin: false
      })
    });
  },
  // 立即捐款
  onSubmit: function() {
    let _self = this;
    _self.setData({
      donatBtnDisabled: true
    });
    setTimeout(() => {
      _self.setData({
        donatBtnDisabled: false
      });
    }, 1500);
    if (_self.data.sum == '' || isNaN(_self.data.sum)) {
      this.showToast('金额格式错误', 'no');
      return false;
    }
    if (+_self.data.sum > 10000000) {
      this.showToast('您输入的金额超过微信支付限制', 'no');
      return false;
    }
    if (_self.data.donor == undefined) {
      _self.showToast('请输入正确的用户名');
      return false;
    } else if (_self.data.donor.length < 2){
      _self.showToast('请输入正确的用户名');
      return false; 
    }
    if (_self.data.sum >= 100 && !util.verifyMobile(_self.data.mobile)) {
      _self.showToast('请输入正确的手机号码');
      return false;
    }
    
    this.fetchDonorInfo((data) => {
      wx.requestPayment({
        'timeStamp': '' + data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': 'MD5',
        'paySign': data.paySign,
        'success':function(res){
          console.log(res);
          _self.fetchDonationList();
          _self.fetchStatistic();
        },
        'fail':function(res){
        }
     })
    });
  },
  // 切换金额
  tabAmount: function(e) {
    var _self = this;
    if (_self.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      _self.setData({
        currentTab: e.target.dataset.current,
        sum: e.target.dataset.number
      })
    }

    if (e.target.dataset.current != 4) {
      _self.setData({
        amountTxt: '',
        phoneInputIsShow: false
      })
    }
  },
  // 获取捐赠列表
  fetchDonationList: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/donation/rolling`,
      method: 'get',
      success: (res) => {
        res.data.data.forEach(element => {
          element.date = element['created_at'].match(/\S*/)[0];
        });
        _self.setData({
          donorList: res.data.data
        })

        let result = [];
        for(let i=0,len=_self.data.donorList.length;i<len;i+=4){
          result.push(_self.data.donorList.slice(i,i+4));
        }
        _self.setData({
          result: result
        })
        console.log(result);
      },
      fail: (res) => {

      }
    })
  },
  // 获取统计数据
  fetchStatistic: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/donation/statistic`,
      method: 'get',
      success: (res) => {
        if (res.data.data != null) {
          _self.setData({
            donationAmount: res.data.data['donation_amount'],
            donationCount: res.data.data['donation_count']
          })
        }
      },
      fail: (res) => {

      }
    })
  },
  stopTouchMove: function() {
    return false;
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
  getUserInfo: function(e) {
    let _self = this;
    if (_self.data.isLogin) {
      _self.onSubmit();
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
                _self.onSubmit()
              }
            }
          })
        });
      });
    }
  },
})