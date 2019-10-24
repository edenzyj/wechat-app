// pages/account/account.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumb: '',
    nickname: '',
    vip: 0,
    account: {
      bank:0,
      points:0,
      usage_count:0,
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    if (app.globalData.regFlag === false) {
      wx.showToast({
        title: '尚未登录',
        image: "/image/warning.png",
        duration: 2000
      });
      setTimeout(function () {
        //要延时执行的代码
        wx.navigateBack({})

      }, 2000) //延迟时间 这里是1秒
      return;
    }



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
    var self = this
    this.setData({
      nickname: app.globalData.nickname,
      thumb: app.globalData.head,
    })
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
      url: "http://192.168.1.102:8000/get_app_account_data/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
        console.log(res.data)
        self.setData({
          account: res.data,
        })
        console.log(self.data.account)
      }
    })
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

  }
})