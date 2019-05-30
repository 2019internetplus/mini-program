//获取应用实例
const App = getApp()
var that;


Page({
  data: {
    noticeList: [],
    noticeCount:0,
  },


  onLoad: function (options) {
    var openid = wx.getStorageSync('openid');
    var token = wx.getStorageSync('token');
    var $this = this;
    wx.request({
      url: 'https://api.xumengli.cn/reports/v0.1/weekly/all/get?openid=' + openid + '&token=' + token,
      success: res => {
        console.log(res);
        const reportsData = res.data.data;
        var data = [];
        for(var i = 0; i < reportsData.length; i++)
          data.push({
            from_value: getDate(reportsData[i].from_value),
            to_value: getDate(reportsData[i].to_value),
            count: reportsData[i].count
          });
        $this.setData({
          noticeList: data
        });
      },
      fail: err=>{
        wx.showModal({
          title: '错误',
          content: err.errMsg,
        })
      }
    })
  },
  onReady: function () {

  },

})

function getDate(time){
  const date = new Date(time * 1000);
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return month + '/' + day;
}