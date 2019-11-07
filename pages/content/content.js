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
    pageData: {},
    wxParseData: [],
    pageId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageId: options.id,
    })
    this.fetchData(options.id);
    console.log('father = ' + options.shareUserId);
    app.globalData.account.father = options.shareUserId;
  },

  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });
    console.log(id);
    const _jwt = wx.getStorageSync('token');
    const jwt = JSON.parse(_jwt);
    console.log(jwt)
    var bearer_jwt = `Bearer ${jwt}`
    const _openid = wx.getStorageSync('openid');
    var mydata = { openid: _openid, id: id };
    wx.request({
      url: Api.getPageByID(id, { mdrender: false }),
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": bearer_jwt
      },
      data: mydata,
      success: function (response) {
        console.log(response);
        var jsonObj = JSON.parse(response.data);
        self.setData({
          pageData: jsonObj, 
        })
        console.log(jsonObj.content);
        WxParse.wxParse('article', 'html', jsonObj.content, self, 5)
        console.log(jsonObj);
        console.log(jsonObj.title);
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
      path: '/pages/content/content?shareUserId=' + wx.getStorageSync('openid')+'&'+'id='+this.data.pageId,
    }
  }
})
