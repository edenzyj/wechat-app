// pages/home/home.js
var id, url1, url2, list = [], that, data, listadd;
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化options为页面跳转所带来的参数 
    id = options.id;  //options.id为上个页面传来的参数
    that = this;    //在请求数据时setData使用
    url1 = "http://xxx" + id + "xxx";  //url拼接
    queryRequest(url1);
    //请求数据
    function queryRequest(url) {
      wx.request({
        url: url,
        data: {},
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // success
          console.log(res.data);
          data = res.data.data;
          list = res.data.data.list; //把取到的数组的值赋值给list
          for (var i = 0; i < list.length; i++) {
            var a = timeString(list[i].display_time);
            list[i].time = a;
            list[i].name = list[i].user.name;
            list[i].headpic = list[i].user.avatar;
          }
          that.setData({   //这里调用setData时不能用this.setData，会报错
            list: list
          })
        }
      }) / 时间戳转换为时间
    }
    function timeString(time) {
      var newDate = new Date();
      newDate.setTime(time);
      // console.log(newDate.toLocaleDateString());
      var result = newDate.toLocaleDateString();
      return result;
    }
  }
})