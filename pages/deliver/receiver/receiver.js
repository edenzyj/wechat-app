// pages/deliver/receiver/receiver.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //登录帐号
    while (app.globalData.regFlag == false) {
      wx.showToast({
        title: '请先登录',
        image: "/image/warning.png",
        duration: 1000
      })
      wx.navigateTo({
        url: 'pages/loginpage/loginpage',
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    //建立领取关系
  //  if (app.connect('change_app_account', {}))
    wx.hideLoading();
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

  }
})