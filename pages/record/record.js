// pages/record/record.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice: 0,
    list: [{
      fields: {
        spend: "32.00",
        time: "2019-10-31T14:44:59.247"
      }
    }],
    name: "充值"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.choice)
    var str = "充值"
    if (options.choice == "1") str = "奖励"
    this.setData({
      choice: parseInt(options.choice),
      name: str,
    })
    console.log(this.data.choice)
    var urlstr = "";
    if(this.data.choice == 0) urlstr = "record"; else urlstr = "reward";
    var self = this
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
      url: app.globalData.baseURL + urlstr+"_query/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
                console.log(res.data)
        //        console.log(self.data.account)
        self.setData({
          list: res.data.reverse(),
        })
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