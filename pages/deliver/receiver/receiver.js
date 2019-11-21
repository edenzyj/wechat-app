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
    console.log(options);

    var self = this
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    var bearer_jwt = `Bearer ${jwt}`
    var header = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": bearer_jwt
    }
    const _openid = wx.getStorageSync('openid');

    var mydata = { openid: _openid, id: options.id };
    //    console.log(mydata);
    wx.request({
      //url: "https://web-ErrorCode400.app.secoder.net/change_app_account/",
      url: app.globalData.baseURL + 'red_bag_get/',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,

      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.showToast({
            title: '领取成功',
            duration: 1000,
          })


        } else {
          wx.showToast({
            title: '领取失败',
            image: "/image/warning.png",
            duration: 1000,
          })
        }
        wx.navigateTo({
          url: '/pages/main/main',
        })
      }
    })

    //建立领取关系
  //  if (app.connect('change_app_account', {}))

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