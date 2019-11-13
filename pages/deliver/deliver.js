// pages/deliver/deliver.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deliver_money: 0,
    left_money:0,
    total_money: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.update_account()  //重新加载用户信息
    this.setData({
      left_money: app.globalData.account.bank,
      total_money: app.globalData.account.bank,
      deliver_money: 0,
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
  inputing: function (e) {
    var self = this
    var money = parseInt("0" + e.detail.value)
    self.setData({
      deliver_money: money,
      left_money: this.data.total_money-money,
    })

  },
  mydeliver: function() {
    //余额不足则退出不允许转让
    if (this.data.deliver_money > this.data.total_money) {
      wx.showToast({
        title: '余额不足',
        image: "/image/warning.png",
        duration: 1000
      });
      return;
    }

    //余额足则跳转分享页
    wx.navigateTo({
      url: 'deliver_share/deliver_share?value='+JSON.stringify(this.data.deliver_money),
    })
  }
})