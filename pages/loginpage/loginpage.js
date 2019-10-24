// pages/loginpage/loginpage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  mylogin: function (e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  mylogin: function (e) {
    var that = this;
    if (!e.detail.userInfo) {
      app.alert({ 'content': '登录失败，请再次点击' });
      return;
    }

    var mydata = e.detail.userInfo;
    wx.login({
      success: function (res) {
        if (!res.code) {
          console.log('登录失败，请再次点击');
          return;
        }
        console.log('123456');
        mydata['code'] = res.code;
        console.log(mydata)
        wx.request({
          url: "https://web-ErrorCode400.app.secoder.net/login/",
//          url: "http://127.0.0.1:8000/login/",

          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: mydata,
          success: function (res) {
            console.log('456789');
            console.log(res.data);
            if (res.statusCode != 200) {
              console.log(res.data.msg );
              console.log(res.statusCode);
              return;
            }
            console.log(res.data);
            app.globalData.userInfo = res.data;
            app.globalData.nickname = res.data.username;
            app.globalData.head = res.data.avatar;
            console.log(res.data.avatar);
            const _token = JSON.stringify(res.data.token);
            //console.log(_token);
            wx.setStorageSync("token", _token);
            wx.setStorageSync("openid", res.data.openid);
            console.log(_token);
            console.log(res.data.openid);
            //that.goToIndex();
            getApp().globalData.regFlag = true;
          }
        });
        /*wx.request({
        url: "http://127.0.0.1:8000/testcount/",
        success: function (res) {
        if (res.statusCode == 200) {
        console.log(res.data);
        }
        else {
        console.log('123');
        }
        }
        });*/
      }
    });
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