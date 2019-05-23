var app = getApp();
Page({
  data: {
    //这是轮播图图片
    imgUrls: [
      '../../images/banner/1.jpg',
      '../../images/banner/2.jpg',
      '../../images/banner/3.jpg',
      '../../images/banner/4.jpg',
      '../../images/banner/5.jpg'
    ],
    indicatordots: true,
    autoplay: true,//自动播放
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    Hei: ""
  },

  imgH: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    var imgh = e.detail.height;　　　　　　　　　　　　　　　　//图片高度
    var imgw = e.detail.width;
    var swiperH = winWid * imgh;　　　　　　//等比设置swiper的高度
    var swiperHei = swiperH / imgw;
    var swiperHeight = swiperH + "px";
    this.setData({
      Hei: swiperHeight　　　　　　　　//设置高度
    })
  },

  onLoad: function () {
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    // var Y = date.getFullYear();
    // var M = date.getMonth() + 1;
    var D = date.getDate();
    // var h = date.getHours();
    // var m = date.getMinutes();
    // var s = date.getSeconds();
    this.setData({
      // month: M,
      day: D
    })

    
  },
  onReady: function() {
  },
  onShow: function () {
  },
})