var util = require('../../../utils/util.js');
var Charts = require('../../../utils/wxcharts.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    var date = Y+"年"+M+"月"+D+"日";
    this.setData({
      date: date,
    }); 

    new Charts({
      animation: true,
      canvasId: 'canvas1',
      type: 'ring',
      extra: {
        ringWidth: 10,//圆环的宽度
        pie: {
          offsetAngle: -90//圆环的角度
        }
      },
      title: {
        name: '90',
        color: '#7cb5ec',
        fontSize: 35
      },
      
      series: [{
        data: 90,
        stroke: false,
        color: '#7cb5ec'
      }, {
        data: 10,
        stroke: false,
        color: '#bfbfbf',
      }, ],
      disablePieStroke: true,
      width: 200,
      height: 150,
      dataLabel: false,
      legend: false,
      padding: 0
    });

    new Charts({
      animation: true,
      canvasId: 'canvas2',
      type: 'radar',
      categories: ['自我肯定','焦虑','忧郁'],
      series: [{
        
        data: [78,88,98]
      }],
      width: 400,
      height: 200,
      extra: {
        radar: {
          max: 100//雷达数值的最大值
        }
      },
      legend: false,
      disablePieStroke: true,
      padding: 0
    });

  },

 

  /*
  wx:navigateBack({
    url: 'pages/home/home',
  }),*/

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