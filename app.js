//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: function (res) {
        var data = {'code': res.code}
        wx.request({
          url: that.globalData.loginURL,
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
  getLoginURL: function() {
    return globalData.loginURL
  },
  globalData: {
    nickname: "未登录",
    head: "/image/ano_user.jpg",
    hasthumb: false,
    userInfo: null,
    regFlag: false,
    loginURL: "127.0.0.1:8000/login"
  }
})