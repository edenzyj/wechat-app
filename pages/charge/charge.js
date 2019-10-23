// pages/charge/charge.js
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
    //从后台访问渠道商或管理员设置的优惠活动
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    console.log(jwt)
    var bearer_jwt = `Bearer ${jwt}`
    var header = {
      "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
    }
    console.log(header)
    console.log(bearer_jwt)
    const _openid = wx.getStorageSync('openid');
    var mydata = {openid: _openid};
    wx.request({
      url: "http://127.0.0.1:8000/get_discount/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
        console.log('success');
        console.log(res.data)
      }
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

  }
})