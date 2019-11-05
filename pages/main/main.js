// pages/main/main.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/image/a3.png',
      '/image/a5.png',
      '/image/a4.png',
      '/image/a2.png',
      '/image/a1.png'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
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
    this.fetchData(options.id);
    //this.fetchPagesData();
  },

  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    console.log(jwt)
    var bearer_jwt = `Bearer ${jwt}`
    const _openid = wx.getStorageSync('openid');
    var mydata = { openid: _openid };
    wx.request({
      url: Api.getPageByID(id, { mdrender: false }),
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
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
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    console.log(jwt)
    var bearer_jwt = `Bearer ${jwt}`
    const _openid = wx.getStorageSync('openid');
    var mydata = { openid: _openid };
    wx.request({
      url: Api.getPages(),
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
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

  }
})
