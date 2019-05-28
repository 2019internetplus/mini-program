var postData = require("../../data/data.js");
//var progressNum = 0;//进度条

/*
function timing(that) {
  var seconds = that.data.seconds
  if (seconds > 21599) {
    that.setData({
      time: '6小时，不想继续了gg'
    });
    return;
  }
  setTimeout(function () {
    that.setData({
      seconds: seconds + 1
    });
    timing(that);
  }
    , 1000)
  formatSeconds(that)
}


function formatSeconds(that) {
  var mins = 0, hours = 0, seconds = that.data.seconds, time = ''
  if (seconds < 60) {

  } else if (seconds < 3600) {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
  } else {
    mins = parseInt(seconds / 60)
    seconds = seconds % 60
    hours = parseInt(mins / 60)
    mins = mins % 60
  }
  that.setData({
    time: formatTime(hours) + ':' + formatTime(mins) + ':' + formatTime(seconds)
  });
}


function formatTime(num) {
  if (num < 10)
    return '0' + num
  else
    return num + ''
}*/
// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    per: 0,
    clear: false,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    index: 0,
    type_0: 0,  //自我肯定
    type_1: 0,  //焦虑
    type_2: 0,  //忧郁
    //title: postData.describe,
    choice: {},
    radios: ['A', 'B', 'C','D'],
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    //seconds: 0,
    //time: '00:00:00',
  },

  randSort: function () {
    return Math.random() > 0.5 ? 1 : -1;
  },

  setList: function () {
    var newList = this.data.list.sort(this.randSort);
    this.setData({
      list: newList
    });
  },

  setRadios: function () {
    var newRadios = this.data.radios.sort(this.randSort);
    this.setData({
      radios: newRadios
    });
  },


  //点击按钮播放音乐
  playmusic: function () {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/data/2310.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },



  select: function (e) {
    var tmp = e.detail.value;
    var type = this.data.choice[this.data.index].type;
    if (type == "0") {     //计算“自我肯定”类型题目的得分
      this.setData({
        type_0: this.data.type_0 + tmp
      })
    } else if (type == "1") {    //计算“焦虑”类型题目的得分
      this.setData({
        type_1: this.data.type_1 + tmp
      })
    } else if (type == "2") {     //计算“忧郁”类型题目的得分
      this.setData({
        type_2: this.data.type_2 + tmp
      })
    }

   
    this.setData({ 
      per: this.data.per+10, 
      })
    if (tmp == 'A') {
      this.setData({
        A: this.data.A + 1
      })
    } else if (tmp == 'C') {
      this.setData({
        C: this.data.C + 1
      })
    } else if (tmp == 'B') {
      this.setData({
        B: this.data.B + 1
      });
    } else if (tmp == 'D') {
      this.setData({
        D: this.data.D + 1
      })
    }
    if (this.data.index < 9) {
      this.setRadios();
      this.setData({
        index: this.data.index + 1,
        clear: false
      });
    } else {
      this.submit();
    }

  },

  submit: function () {
    var result = (this.data.A + this.data.B*2 + this.data.C*3 + this.data.D*4)/40*100;    
    //A、B、C、D分别按1，2，3，4分算，再转成100分制
    console.log(result);
    console.log(this.data.type_0);
    console.log(this.data.type_1);
    console.log(this.data.type_2);
    wx.redirectTo({
      url: '/pages/home/result/result?result=' + result + '&type_0=' + this.data.type_0/16*100 + '&type_1=' + this.data.type_1/12*100 + '&type_2=' + this.data.type_2/12*100,
    })

    /*
    wx.navigateTo({
      url: '../pages/result/result',
    })
    */
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //timing(this);
    this.setList();
    this.setRadios();
    this.setData({
      A: 0,
      C: 0,
      B: 0
    });

    var that = this;
    wx.request({
      url: 'https://api.xumengli.cn/test/v0.1/get',
      method:'GET',
      header:{
        "content-type":"json"
      },
      success: function(res){
       that.setData({
         choice:res.data.data
       });
        console.log(that.data.choice);
      },
      fail:function(res) {
        console.log(error)
      }

    })

   
  }

})