var app = getApp();
// var util = require("../../utils/util.js");
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
    indicatorDots: false, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    imgheights: [],//所有图片的高度  
    imgwidth: 750,//图片宽度 
    current: 0,//默认
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },

  onLoad: function () {
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;


    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    // var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    // var h = date.getHours();
    // var m = date.getMinutes();
    // var s = date.getSeconds();
    this.setData({
      month: M,
      day: D
    })
  },
  onReady: function() {
  },
  onShow: function () {
    
  },
})