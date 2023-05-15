// pages/charge/charge.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: new Array(),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
              base: resdata[i].base,
            })
          }
        }
        self.setData({
          options: self.data.options,
        })
        console.log(self.data.options)
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
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

  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
    console.log('aa')
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    var bearer_jwt = `Bearer ${jwt}`
    const _openid = wx.getStorageSync('openid');
    var mydata = { openid: _openid };
    wx.request({
      url: app.globalData.baseURL + "wxpay/pay/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
        console.log(res.data)
        console.log(res.data.paySign)
        //const payData = JSON.parse(res.data)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          'success': function (res) {
            console.log(res)
          },
          'fail': function (res) {
            console.log(res)
          },

        })
      }
    })
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
//    var paydata = { openid: _openid, money: self.data.options[id].base*100 };
//    var paydata = { openid: _openid, money: 1 };
    var paydata = { openid: _openid, money: self.data.options[id].base };
    var paySuccessFlag = false;
    wx.request({
      url: app.globalData.baseURL + "wxpay/pay/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: paydata,
      success: function (res) {
        console.log(res.data)
        console.log(res.data.paySign)
        //const payData = JSON.parse(res.data)
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          'success': function (res) {
            console.log('success')
            console.log(res)
            paySuccessFlag = true;
            self.pay({ openid: _openid, delta: JSON.stringify(_delta) })
          },
          'fail': function (res) {
            console.log('fail')
            console.log(res)
            paySuccessFlag = false;
          },

        })
      }
    })


  },
  pay: function(mydata) {
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    var bearer_jwt = `Bearer ${jwt}`

    wx.request({
      //url: "https://web-ErrorCode400.app.secoder.net/change_app_account/",
      url: app.globalData.baseURL + "change_app_account/",
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (res) {
        console.log(res.data)
        console.log("充值成功")
        app.update_account()
        wx.showToast({
          title: '充值成功！',
          duration: 1500
        });
      }
    })
  }
})