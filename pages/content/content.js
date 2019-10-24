// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: [
      {
        type: true,
        content: '',
        src: '../../image/sleep.jpg',
        style: 'height:540rpx;width:720rpx;',
        clss: ''
      }, 
      {
        type: false,
        content: '人脑的重量仅有3磅（1.36千克）左右，约为平均成人体重的2%。然而，这个器官却消耗了人体20％~25%的能量。在这过程中，大脑会产生大量可能有毒的垃圾蛋白和其他生物废物。成人的大脑每天需要清除7克垃圾蛋白，并用全新的蛋白替换。这个数字意味着大脑每个月会产生半磅（约227克）废物，一年内就能产生3磅垃圾，和大脑总质量相当。',
        src: '',
        style: '',
        clss: 'content-text'
      }, 
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this.page;
    wx.request({
      //          url: "http://web-ErrorCode400.app.secoder.net/login/",
      url: "http://127.0.0.1:8000/content/",

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
              content:'',
              style:'height:540rpx;width:720rpx;',
              clss:'',
            });
          }
        }
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