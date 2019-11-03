// pages/content/content.js
const app = getApp()

var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '页面内容',
    pageData: {},
    pagesList: {},
    hidden: false,
    wxParseData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData(options.id),
      this.fetchPagesData()
    console.log('father = ' + options.shareUserId);
    app.globalData.account.father = options.shareUserId;
    var page = this.page;
    wx.request({
      // url: "http://web-ErrorCode400.app.secoder.net/login/",
      url: "http://127.0.0.1:17137/content/",

      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: options.id,
      },

      success: function (res) {
        console.log('456789');
        //console.log(res);
        if (res.statusCode != 200) {
          console.log(res.data.msg);
          console.log(res.statusCode);
          return;
        }
        for (var i = 0; i < res.data.length; ++i) {
          if (res.data[i].type == 'text') {
            page.push({
              type: false,
              content: res.data[i].content,
              src: '',
              style: '',
              clss: '',
            });
          } else {
            page.push({
              type: true,
              src: res.data[i].img,
              content: '',
              style: 'height:540rpx;width:720rpx;',
              clss: '',
            });
          }
        }
      }
    });
  },

  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });
    wx.request({
      url: Api.getPageByID(id, { mdrender: false }),
      success: function (response) {
        console.log(response);
        self.setData({
          pageData: response.data,
          // wxParseData: WxParse('md',response.data.content.rendered)
          wxParseData: WxParse.wxParse('article', 'html', response.data.content.rendered, self, 5)
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },

  fetchPagesData: function () {
    var self = this;
    wx.request({
      url: Api.getPages(),
      success: function (response) {
        self.setData({
          pagesList: response.data
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
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
    console.log("share on content" + wx.getStorageSync('openid'));
    return {
      path: '/pages/content/content?shareUserId=' + wx.getStorageSync('openid')
    }
  }
})
