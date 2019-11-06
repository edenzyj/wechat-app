// pages/devices/devices.js
const app = getApp();
var adapterState = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchDevices();
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
  searchDevices: function() {
    console.log('开始搜索仪器');
    var that = this;
    var discoveryi = 0;
    console.log('点击前蓝牙状态:' + adapterState);
    if (!adapterState) {
      this.openAdapter();
    }
    wx.showLoading({
      title: '加载中',
    });
    var timer = setInterval(function () {
      //搜索所有UUID的设备
      wx.startBluetoothDevicesDiscovery({
        services: [],
        success: function (res) {
          console.log("开始搜索---");
        }
      });
      //获取蓝牙设备，只包含ANTIS字段的内容才会存入
      wx.getBluetoothDevices({
        success: function (res) {
          console.log("获取设备---");
          //将devices存入list中
          var j = 0;
          var secondlist = new Array();
          for (var i = 0; i < res.devices.length; i++) {
            if (
              (res.devices[i].name.toLocaleLowerCase().indexOf("antis") != -1)) {
              secondlist[j] = res.devices[i];
              j++;
            }
          }
          that.setData({
            deviceList: secondlist
          })
          console.log('The device list: ', that.data.deviceList);
        },
      });
      discoveryi++;
      console.log('搜素--', discoveryi);
      if (discoveryi > 2) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1500);
        timer = clearInterval(timer);
        discoveryi = 0;
        wx.stopBluetoothDevicesDiscovery({});
      }
    }, 500);
  },

  //打开蓝牙适配器的函数
  openAdapter: function () {
    wx.openBluetoothAdapter({
      success: function (res) {
        wx.getBluetoothAdapterState({
          success: function (res) {
            adapterState = res.available;
            console.log('蓝牙状态: ', adapterState);
          }
        })
      },
      fail: function (res) {
        wx.getBluetoothAdapterState({
          success: function (res) {
            adapterState = res.available;
            if (!adapterState) {
              wx.showToast({
                title: '启用功能需要先打开手机蓝牙',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },

})