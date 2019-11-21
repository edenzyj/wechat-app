// pages/channel/channel.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "",
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
  onShow:function() {

  },
  click: function () {

    var that = this;
    var username;
    wx.scanCode({
      success: (res) => {
//        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        username = res.result;
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        if (!app.globalData.regFlag)  {
          wx.showToast({
            title: '请先登录',
            icon: "/image/warning.png",
            duration: 2000
          })          
        } else {
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
          var mydata = { openid: _openid, dealer: username };
          wx.request({
            url: app.globalData.baseURL + "set_dealer/",
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": bearer_jwt
            },
            data: mydata,
            success: function (res) {
              console.log(res);
              if(res.statusCode == 200) {
                wx.showToast({
                  title: '添加渠道成功',
                  icon: "success",
                  duration: 2000
                })  

              } else {
                wx.showToast({
                  title: '添加渠道失败',
                  icon: "/image/warning.png",
                  duration: 2000
                })  
              }
              setTimeout(function () {
                //要延时执行的代码
                wx.navigateBack({})

              }, 2000)
            }
          })

        }
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: "/image/warning.png",
          duration: 2000
        })
      },
      complete: (res) => {
      }
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