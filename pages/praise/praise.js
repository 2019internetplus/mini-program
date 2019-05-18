//index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: [
      {
        nickname:"凉凉",
        headimg: '../../images/lunBo/2.png',
        message:"感动，一个星期没碰辣椒，还好我妈给我寄了剁辣椒"
      },
      {
        nickname: "咕咕咕",
        headimg: '../../images/lunBo/3.png',
        message:"我怎么这么厉害！"
      },
      {
        nickname: "3",
        headimg: '../../images/lunBo/2.png',
        message: "123"
      },
      {
        nickname: "4",
        headimg: '../../images/lunBo/2.png',
        message: "123"
      }
    ],
    liuyanlist: [
      {
        nickname: "真香",
        headimg: '../../images/lunBo/1.png',
        liuyantext:"夸一个！"
      },
      {
        nickname: "110",
        headimg: '../../images/lunBo/1.png',
        liuyantext: "12148"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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
