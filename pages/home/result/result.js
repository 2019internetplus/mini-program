var util = require('../../../utils/util.js');
var Charts = require('../../../utils/wxcharts.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    score: 0,
    type: []
  },

  showRing: function() {
    var color = '';
    var tmp = this.data.score;
    if(tmp < 60)
      color = '#fa2500';   //红
    else if(tmp >= 50&& tmp < 85)
      color = '#61a7ff';   //蓝
    else if(tmp >= 85)
      color = '#ffaf46'     //黄

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
        name: this.data.score,
        color: color,
        fontSize: 35
      },

      series: [{
        data: this.data.score,
        color: color
      }, {
        data: 100 - this.data.score,
          color: '#e6e7e2',
      },],
      disablePieStroke: true,
      width: 200,
      height: 150,
      dataLabel: false,
      legend: false,
      padding: 0
    });
  },

  showRadar: function() {
    new Charts({
      animation: true,
      canvasId: 'canvas2',
      type: 'radar',
      categories: ['自我肯定', '抗焦虑', '抗忧郁'],
      series: [{
        color: '#ffaf46',
        data: this.data.type
      }],
      width: 300,
      height: 200,
      extra: {
        radar: {
          max: 100//雷达数值的最大值
        }
      },
      legend: false,
      disablePieStroke: true,
      padding: 0,
      dataPointShape: false,
    });

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

    console.log(options.result);
    console.log(options.type_0);
    console.log(options.type_1);
    console.log(options.type_2);
    const commit =  wx.getStorageSync('commit_time') == new Date().getDate() ? 1 : 0;
    wx.setStorageSync('commit_time', new Date().getDate());

    this.setData({
      date: date,
      score: parseInt(options.result),   //将result转换成number类型
      type: [options.type_0, options.type_1, options.type_2],
    }); 

    console.log(this.data.score);
    console.log(typeof (options.result))
    
    this.showRing();
    this.showRadar();
    

  },

  onUnload: function(){
    this.gotoHomePage();
  },

  gotoHomePage: function(){
    wx.reLaunch({
      url: '/pages/home/home',
    });
  }
})