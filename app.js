//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    /*
    wx.login({
      success: function (res) {
        var data = {'code': res.code}
        wx.request({
          url: that.globalData.baseURL+'login/',
          method: 'POST',
          data: data,
          success: function (res) {
            if (res.data.code != 200) {
              that.alert({ 'content': res.data.msg });
              return;
            }
            if ("token" in res.data.data) {
              that.setCache("token", res.data.data.token);
              that.globalData.regFlag = true;
            }
          }
        });
      }
  
    });
    */
    /*
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })*/
  },
  update_account: function () {
    var self = this
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    var bearer_jwt = `Bearer ${jwt}`
    var header = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": bearer_jwt
    }
    const _openid = wx.getStorageSync('openid');

    var mydata = { openid: _openid };
    //账户界面加载时从后端获取用户余额

    wx.request({
      //url: "https://web-ErrorCode400.app.secoder.net/change_app_account/",
      url: self.globalData.baseURL + "get_app_account_data/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
        //        console.log(res.data)
        self.globalData.account = res.data
        //        console.log(self.data.account)
      }
    })

  },

  getLoginURL: function() {
    return globalData.loginURL
  },
  connect: function(url, data) {


  },
  globalData: {
    nickname: "未登录",
    head: "/image/no_user.png",
    hasthumb: false,
    userInfo: null,
    regFlag: false,
    loginURL: "http://183.172.140.221:8000/login/",
    //baseURL: "http://183.172.137.178:8000/",
    //baseURL: "https://web-ErrorCode400.app.secoder.net/",
    baseURL: "http://192.168.0.103:8000/",

    k: 1.0,
    account: {
      bank: 0,
      points: 0,
      usage_count: 0,
      vip_lever: 0,
      father: null,
      fund: 0,
    },

  },
})