// pages/transfer/transfer.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_money:0,
    target_score: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  inputing: function(e) {
    var self = this
    console.log(e.detail)

    console.log(app.globalData.k)
    var money = parseInt("0" + e.detail.value)
    var k = app.globalData.k
    self.setData({
      input_money: parseInt(money),
      target_score: money * k,
    })

  },
  mytransfer: function() {
    var self = this
    if (self.data.input_money > app.globalData.account.bank) {
      wx.showToast({
        title: "金额过大",
        image: "/image/warning.png",
        duration: 1000,
      })
      return
    }
    //console.log(e.currentTarget.dataset.id)
    var _delta = {
      bank: -self.data.input_money,
      points: self.data.target_score,
    }
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    var bearer_jwt = `Bearer ${jwt}`
    var header = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": bearer_jwt
    }
    const _openid = wx.getStorageSync('openid');
        console.log(_delta)
    //    console.log(JSON.stringify(_delta))

    var mydata = { openid: _openid, delta: JSON.stringify(_delta) };
    //点击转换按钮，向服务器发送积分充值请求

    wx.request({
      //url: "https://web-ErrorCode400.app.secoder.net/change_app_account/",
      url: app.globalData.baseURL + "change_app_account/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
        console.log(res.data)
        console.log("充值成功")
        app.update_account()
        wx.showToast({
          title: '积分充值成功！',
          duration: 1500
        });
      }
    })
  }

})