// pages/main/main.js
var id,url1,url2,list=[],that,data,listadd;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化options为页面跳转所带来的参数
    id=options.id;
    that = this;
    url1 ="http://www.antisi.com/product/class/"+id+"xxx";
    queryRequest(url1);
    // 请求数据
    function queryRequest(url){
      wx.request({
        url: url,
        data: {},
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function(res){
          console.log(res.data);
          data = res.data.data;
          list = res.data.data.list;
          for(var i=0;i<list.length;i++){
            var a=timeString(list[i].display_time);
            list[i].time=a;
            list[i].name=list[i].user.name;
            list[i].headpic=list[i].user.avatar;
          }
          that.setData({
            list:list
          })
        }
      })
      // 时间戳转换为时间
      function timeString(time){
        var newDate = new Date();
        var result = newDate.toLocalDateString();
        return result;
      }
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

  }
})
