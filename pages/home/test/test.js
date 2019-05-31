var postData = require("../../data/data.js");

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
    result: 0,
    choice: {},
    radios: ['A', 'B', 'C','D'],
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    
  },

  getscore: function(tmp) {
    if (tmp == 'A') {
      return 1;
    } else if (tmp == 'B') {
      return 2;
    } else if (tmp == 'C') {
      return 3;
    } else if (tmp == 'D') {
      return 4;
    }
  },

  select: function (e) {
    var tmp = e.detail.value;
    console.log(tmp);
    var type = this.data.choice[this.data.index].type;
    if (type == "0") {     //计算“自我肯定”类型题目的得分
      this.setData({
        type_0: this.data.type_0 + this.getscore(tmp),
      })
    } else if (type == "1") {    //计算“焦虑”类型题目的得分
      this.setData({
        type_1: this.data.type_1 + this.getscore(tmp),
      })
    } else if (type == "2") {     //计算“忧郁”类型题目的得分
      this.setData({
        type_2: this.data.type_2 + this.getscore(tmp),
      })
    }

   
    this.setData({ 
      per: this.data.per+10,
      result: this.data.result + this.getscore(tmp)
      })
    if (this.data.index < 9) {
      
      this.setData({
        index: this.data.index + 1,
        clear: false
      });
    } else {
      this.submit();
    }

  },

  submit: function () {
        
    //A、B、C、D分别按1，2，3，4分算，再转成100分制
    console.log(this.data.result);
    console.log(this.data.type_0);
    console.log(this.data.type_1);
    console.log(this.data.type_2);
    var s1 = Math.round(this.data.result / 40 * 100);
    var s2 = Math.round(this.data.type_0 / 16 * 100);
    var s3 = Math.round(this.data.type_1 / 12 * 100);
    var s4 = Math.round(this.data.type_2 / 12 * 100);

    const commit = wx.getStorageSync('commit_time') == new Date().getDate() ? 1 : 0;
    
    const token = wx.getStorageSync('token');
    const openid = wx.getStorageSync('openid');

    wx.request({
      url: 'https://api.xumengli.cn/em/v0.1/addTestValue?token=' +  token +'&commit='+ commit +'&openid='+ openid +'&test_value='+ s1 +'&self_affirm='+ s2*0.4 +'&anti_anxiety='+ s3*0.3 +'&anti_melancholy='+ s4*0.3,
      method: 'PUT',
      dataType: 'STRING',
     
     
      success: function (res) {
        wx.setStorageSync('commit_time', new Date().getDate());
        console.log(res.data.message)
      },
      fail: function(error) {
        console.log(error)
      }

    })

    wx.redirectTo({
      url: '/pages/home/result/result?result=' + s1 + '&type_0=' + s2 + '&type_1=' + s3 + '&type_2=' + s4
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
    this.setData({
      
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
      fail: function(res) {
        console.log(error)
      }

    })

   
  }

})