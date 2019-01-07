//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
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
    proList: [],
    indicatorDots: false,
    logoImg: 'https://xcx-chunshan.kejishuihua.com/storage/images/011628745373cbc108e650c8ed46151f.png',
    qrcodeImg: 'https://xcx-chunshan.kejishuihua.com/storage/images/5a79ce3caffce3d79636341536a70341.png',
    zhengshuImg: 'https://xcx-chunshan.kejishuihua.com/storage/images/ef3316a5c7d1598337a9d98e4deca832.png',
    zhengshu1Img: 'https://xcx-chunshan.kejishuihua.com/storage/images/4a211c285f1ce44538942b87be752c66.png',
    banner: '/images/index_banner.png',
    newsList: [
      {
        "title": "西安水花科技官方微信小程序上线了",
        "date": "2018-12-31"
      },
      {
        "title": "西安水花科技官方微信小程序上线了",
        "date": "2018-12-31"
      },
      {
        "title": "西安水花科技官方微信小程序上线了",
        "date": "2018-12-31"
      },
      {
        "title": "西安水花科技官方微信小程序上线了",
        "date": "2018-12-31"
      }
    ],
    serviceList: [
      {
        "title": "软件定制及产品方案服务 灌篮高手两个花露水",
        "imgSrc": "/images/index_service_1.png"
      },
      {
        "title": "视觉设计",
        "imgSrc": "/images/index_service_2.png"
      }
    ],
    caseList: [
      {
        "title": "纯山教育基金会",
        "imgSrc": "/images/index_case.png"
      }
    ]
  },
  
  onLoad: function () {
    
  },
  onShow: function() {
    let _self = this;
    console.log(`-----------`);
    console.log(wx.canIUse('getSetting'));
    if (wx.getStorageSync('ch_isLogin')) {

    } else {
      // wx.hideTabBar({});
      // _self.showPopup();
    }

    this.fetchProList();
    this.fetchDonationList();
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
  showDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.show();
  },
  showPopup() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.show();
  },
  hidePopup() {
    let popupComponent = this.selectComponent('.J_Popup');
    popupComponent && popupComponent.hide();
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
  hideDialog() {
    let dialogComponent = this.selectComponent('.wxc-dialog')
    dialogComponent && dialogComponent.hide();
  },
  onConfirm () {
    this.hideDialog()
  },
  onCancel () {
    this.hideDialog()
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
  fetchProList: function() {
    let _self = this;
    let id = this.data.actId;
    util.permissionRequest({
      url: `${util.hostname}/api/project`,
      data: {},
      method: 'get',
      success: (res) => {
        if (res.statusCode == 200) {
          this.setData({
            proList: res.data.data.data
          })
        } else {
          _self.showToast(res.errMsg);
        }
      },
      fail: (res) => {
        _self.showToast(res.errMsg);
      }
    })
  },
  fetchDonationList: function() {
    let _self = this;
    util.request({
      url: `${util.hostname}/api/donation/rolling`,
      method: 'get',
      success: (res) => {
        // res.data.data.forEach(element => {
        //   element.date = element['created_at'].match(/\S*/)[0];
        // });
        // _self.setData({
        //   // donorList: res.data.data
        // })
        let newsList = [];
        for(let i=0,len=_self.data.newsList.length;i<len;i+=2){
          newsList.push(_self.data.newsList.slice(i,i+2));
        }
        _self.setData({
          newsList: newsList
        })
        console.log(newsList);
      },
      fail: (res) => {

      }
    })
  }
})
