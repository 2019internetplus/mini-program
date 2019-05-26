var app = getApp();
Page({
  data: {
    //这是轮播图图片
    imgUrls: [
      
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

  toRecord: function(){
    wx.navigateTo({
      url: '/pages/home/record/record',
    })
  },

  toTest: function(){
    wx.navigateTo({
      url: '/pages/home/result/result',
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
    console.log("1")
    let $this = this;
    //获取心灵鸡汤图片
    wx.request({
      url: 'https://api.xumengli.cn/soulsoup/v0.1/get',
      method: "GET",
      dataType: "json",
      success:function(data){ //success callback
        if(data.data.code == 100){
          let image_src = []
          for(let i = 0; i < data.data.data.length; i++)
          image_src.push(data.data.data[i].image_src);
          
          $this.setData({imgUrls: image_src}); // set imageUrls data
        }else
          wx.showToast({
            title: data.data.message,
            icon: 'none',
          });
        
      },
      fail: function(err){
        wx.showToast({
          title: err,
          icon: 'none'
        });
      }
    })
  },
  onReady: function() {
    
  },
  onShow: function () {
  },
})

