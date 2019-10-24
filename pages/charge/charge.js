// pages/charge/charge.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: new Array(),


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var myoptions = self.data.options;

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
      url: app.globalData.baseURL+"get_discount/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
        console.log('success');
        console.log(res.data);
        var resdata = JSON.parse(res.data);
        console.log(resdata)
        console.log(typeof myoptions)
        for (var i = 0, l = resdata.length; i < l; i++) {
//          console.log(i)
          if (resdata[i].choice === 1) {
            myoptions.push({
              title: "满" + resdata[i].base + "元送" + resdata[i].bonus+"元",
              desc: "暂无", 
              price: resdata[i].base+resdata[i].bonus,
            })
          }
          
        }
        self.setData({
          options: self.data.options,
        })
        console.log(self.data.options)

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

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  sendcharge: function (e) {
    var self = this
    var id = e.currentTarget.dataset.id
    //console.log(e.currentTarget.dataset.id)
    var _delta = {
      bank: self.data.options[id].price,
    }
    console.log(id)
    console.log(self.data.options[id])

    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    var bearer_jwt = `Bearer ${jwt}`
    var header = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": bearer_jwt
    }
    const _openid = wx.getStorageSync('openid');
//    console.log(_delta)
//    console.log(JSON.stringify(_delta))
    
    var mydata = { openid: _openid , delta: JSON.stringify(_delta)};
    //点击充值按钮，向服务器发送充值请求

    wx.request({
      //url: "https://web-ErrorCode400.app.secoder.net/change_app_account/",
      url: app.globalData.baseURL+"change_app_account/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
        console.log(res.data)
        console.log("充值成功")
        wx.showToast({
          title: '充值成功！',
          duration: 1500
        });
      }
    })
  }
})