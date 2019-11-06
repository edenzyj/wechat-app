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
    account: app.globalData.account,
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
    app.update_account()
    setTimeout(function () {
      //要延时执行的代码
      self.setData({
        account: app.globalData.account,
      })
    }, 100) //延迟时间 这里是1秒


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
    this.setData({
      account: app.globalData.account,
    })
    return
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