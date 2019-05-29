// pages/myreport/myreport.js
var Charts = require('../../../utils/wxcharts.js');

Page({
  data: {
    currentTab: 0,
    items: [
      {
        "text": "周",
        "color": "#d3d3d3",
        "selectedColor": "#515151",
      },
      {
        "text": "月",
        "color": "#d3d3d3",
        "selectedColor": "#515151",
      },
      
    ],

    week: [],
    date: 0,
    month: 0,
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  getweek: function(date1){   //根据这天的日期得到这一周的时间
    var d = new Date();
    console.log(date1);
    d.setDate(date1);
    var day = d.getDay();
    var date = d.getDate();
    console.log(date);
    console.log(day);

    if(day==0)       //将date定位到这周的周一
      d.setDate(date-6);
    else if(day>1 && day<=6)
      d.setDate(date-day+1);

    var array = [];
    for(var i=0;i<7;i++) {
      array.push((d.getMonth()+1) + '/' + d.getDate());
      d.setDate(d.getDate()+1);
    }

    this.setData({
      week: array,
    });

  },

  preweek: function() {   //
    var d = this.data.date;
    this.setData({
      date: d - 7,
    })
    this.getweek(d - 7);
    this.showColumn1();
    this.showRadar1();
  },

  nextweek: function() {
    var d = this.data.date;
    this.setData({
      date: d + 7,
    })
    this.getweek(d + 7);
    this.showColumn1();
    this.showRadar1();
  },

  premonth: function() {
    this.setData({
      month: this.data.month - 1,
    })
  },

  nextmonth: function() {
    this.setData({
      month: this.data.month + 1,
    })
  },

  showColumn1: function() {
    new Charts({
      animation: true,
      canvasId: 'canvas1',
      dataPointShape: false,
      type: 'column',
      categories: this.data.week,
      series: [{
        data: [15, 20, 45, 37, 4, 90, 66],
        color: '#FFdead',
      }],

      xAxis: {
        disableGrid: true,
      },
      yAxis: {
        max: 100,
        min: 0,
      },
      width: 350,
      height: 200,
      dataLabel: true,
      legend: false,
      extra: {
        column: {
          width: 25, //柱的宽度

        }
      }
    });
  },

  showColumn2: function(){
    new Charts({
      animation: true,
      canvasId: 'canvas3',
      dataPointShape: false,
      type: 'column',
      categories: ['第一周', '第二周', '第三周', '第四周'],
      series: [{
        data: [37, 40, 90, 66],
        color: '#FFdead',
      }],

      xAxis: {
        disableGrid: true,
      },
      yAxis: {
        max: 100,
        min: 0,
      },
      width: 350,
      height: 200,
      dataLabel: true,
      legend: false,
      extra: {
        column: {
          width: 25, //柱的宽度

        }
      }
    });

  },

  showRadar1: function() {
    new Charts({
      animation: true,
      canvasId: 'canvas2',
      type: 'radar',
      dataPointShape: false,
      categories: ['自我肯定', '焦虑', '忧郁'],
      series: [{
        data: [78, 88, 98],
        color: '#FFdead'
      }],
      width: 350,
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

  showRadar2: function() {
    new Charts({
      animation: true,
      canvasId: 'canvas4',
      type: 'radar',
      dataPointShape: flase,
      categories: ['自我肯定', '焦虑', '忧郁'],
      series: [{
        data: [78, 88, 98],
        color: '#FFdead'
      }],
      width: 350,
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
  
  onLoad: function () {
    var d = new Date();
    var tmp1 = d.getDate();
    console.log(tmp1);
    var tmp2 = d.getMonth() + 1;
    this.setData({
      date: tmp1,
      month: tmp2
    })
    this.getweek(tmp1);

    this.showColumn1();
    this.showRadar1();
    this.showColumn2();
    this.showRadar2();
    /*let that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })*/
  }
  
})