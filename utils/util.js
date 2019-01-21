// const hostname = 'https://xcx-chunshan.kejishuihua.com';
const hostname = 'https://xcx.kejishuihua.com';
const appId = '2c8b3c74-aaf1-4996-9f07-4f07d975082f';
const imghost = 'https://xcx.kejishuihua.com';
// const verifyId = require('./verifyId.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let request = obj => {
  wx.request({
    url: obj.url, //仅为示例，并非真实的接口地址
    data: obj.data,
    header: {
        'content-type': 'application/json', // 默认值
        'X-Requested-With': 'XMLHttpRequest'
    },
    method: obj.method || 'post',
    success: function(res) {
      console.log(`-------${obj.url}------`);
      console.log(`-----success res-----`);
      console.log(res);
      obj.success && obj.success(res);
    },
    fail: function(res) {
      console.log(`-------${obj.url}------`);
      console.log(`-----fail res-----`);
      console.log(res);
      obj.fail && obj.fail(res);
    }
  })
}

let permissionRequest = (obj, callback) => {
  wx.request({
    url: obj.url, //仅为示例，并非真实的接口地址
    data: obj.data,
    header: {
        'content-type': 'application/json', // 默认值
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': `Bearer ${wx.getStorageSync('ch_token') != undefined ? wx.getStorageSync('ch_token') : ''}`
    },
    method: obj.method || 'post',
    success: function(res) {
      console.log(`-------${obj.url}------`);
      console.log(`-----success res-----`);
      console.log(res); 
      if (res.statusCode == 401){
        console.log('需先进行授权');
        callback && callback();
        // wx.navigateTo({
        //   url: '/pages/setting/setting'
        // })
        // wx.switchTab({
        //   url: '/pages/index/index'
        // });
      } else {
        obj.success && obj.success(res);
      }
    },
    fail: function(res) {
      console.log(`-------${obj.url}------`);
      console.log(`-----fail res-----`);
      console.log(res);
      obj.fail && obj.fail(res);
    }
  })
}

const login = (callback) => {
  wx.login({
    success: function(res) {
      if (res.code) {
        //发起网络请求
        request({
          url: `${hostname}/api/login`,
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
              let session_key = res.data.data['session_key'];
              wx.setStorageSync('session_key', res.data.data['session_key']);
              callback && callback(session_key);
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  });
}

const getUserInfo = (a, callback) => {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        wx.showLoading({
          title: '登录中...',
        })
        
        wx.getUserInfo({
          success: function(res) {
            request({
              url: `${hostname}/api/authenticate`,
              data: {
                sk: a,
                iv: res.iv,
                encryptedData: res.encryptedData
              },
              success: (res) => {
                wx.hideLoading()
                debugger
                if (res.data.data.token) {
                  wx.setStorageSync('ch_token', res.data.data.token['access_token']);
                  wx.setStorageSync('ch_user', res.data.data.user);
                  wx.setStorageSync('ch_isLogin', true);
                  let Expiration = Number(res.data.data.token['expires_in']) * 1000 + Number(Date.now());
                  console.log(`--expires_in--${Number(res.data.data.token['expires_in']) * 1000}`);
                  console.log(`--Expiration--${Expiration}`);
                  wx.setStorageSync('Expiration', Expiration);
                } else {
                  console.log('authenticate server error');
                }
                callback && callback();
              },
              fail: (res) => {
                wx.hideLoading()
              }
            })
          }
        })
      } else {

      }
    },
     fail: err => {

     }
  })
};

let verifyMobile = function(val) {
  return /^1[0-9]{10}$/.test(val);
}
module.exports = {
  formatTime: formatTime,
  request: request,
  hostname: hostname,
  login: login,
  getUserInfo: getUserInfo,
  permissionRequest: permissionRequest,
  imghost: imghost,
  // verifyId: verifyId.verifyId,
  verifyMobile: verifyMobile,
  app_id: appId
}
