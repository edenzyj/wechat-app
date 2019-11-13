// pages/equipment/equipment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    deviceId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      deviceId: options.id,
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

  writeblue: function (result) {
    console.log('writing ' + result);
    var that = this;
    var buffer = char2buf(result);
    wx.writeBLECharacteristicValue({
      deviceId: that.data.deviceId,
      serviceId: that.data.serviceId,
      characteristicId: that.data.characteristicId,
      value: buffer,
      success: function (res) {
        console.log("发送成功---", result);
      },
      fail: function (res) {
        console.log('发送失败')
      },
    })
  },


})

function char2buf(result) {
  var buffer = new ArrayBuffer(result.length);
  var u16a = new Uint8Array(buffer);
  var strs = result.split("");
  for (var i = 0; i < strs.length; i++) {
    u16a[i] = strs[i].charCodeAt();
  }
  return (buffer)
};

