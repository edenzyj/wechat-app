// pages/account/account.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumb: '',
    nickname: '',
    grids: [{
      name: "资金",
      src: "/image/invest.png",
      value: 1234.02
    }, {
      name: "积分",
      src: "/image/score.png",
      value: 234
    }, {
      name: "使用权",
      src: "/image/left.png",
      value: 3
    }],
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
    this.setData({
      nickname: app.globalData.nickname,
      thumb: app.globalData.head,
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