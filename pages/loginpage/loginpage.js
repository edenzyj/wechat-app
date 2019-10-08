// pages/loginpage/loginpage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  mylogin: function (e) {
    var that = this;
    if (!e.detail.userInfo) {
      app.alert({ 'content': '登录失败，请再次点击' });
      return;
    }

    var data = e.detail.userInfo;
    wx.login({
      success: function (res) {
        if (!res.code) {
          app.alert({ 'content': '登录失败，请再次点击' });
          return;
        }
        data['code'] = res.code;
        wx.request({
          url: app.getLoginURL(),
          method: 'POST',
          data: data,
          success: function (res) {
            if (res.data.code != 200) {
              app.alert({ 'content': res.data.msg });
              return;
            }
            app.setCache("token", res.data.data.token);
            //that.goToIndex();
            getApp().globalData.regFlag = true;
          }
        });
      }
    });
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

  }
})