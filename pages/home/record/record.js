

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    message: ''
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

  },
  /**
   * 绑定提交事件
   */
  bindFormSubmit: function(){
    if(parseInt(this.data.value) < 0 || parseInt(this.data.value) > 100){
      wx.showModal({
        title: '错误',
        content: '心情值的取值是0-100',
      });
      return;
    }
    if(this.data.value === ""){
      wx.showModal({
        title: '错误',
        content: '心情值不能为空',
      });
      return;
    }

    /** 提交表单 **/
    const _commit = wx.getStorageSync('commit_time'); //上一次提交的时间
    const date = new Date().getDate();
    const commit = _commit == date ? 1 : 0;
    //表单内容
    const reqData = {
      commit : commit,
      input_value: this.data.value,
      message: this.data.message,
      token: wx.getStorageSync('token'),
      openid: wx.getStorageSync('openid')
    };
    wx.request({
      url: 'https://api.xumengli.cn/em/v0.1/addInputValue?commit=' + reqData.commit + '&input_value=' + reqData.input_value +
        '&message=' + reqData.message + "&token=" + reqData.token + "&openid=" + reqData.openid,
      dataType: 'STRING',
      method: 'PUT',
      success: (res) => {
        const jsonData = JSON.parse(res.data);
        //成功
        if(jsonData.code == 100){
          wx.setStorageSync('commit_time', date); //跟新提交时间
          //返回首页
          wx.reLaunch({
            url: '/pages/home/home',
          });
          wx.showToast({
            title: '添加成功',
          });
        }else{
          wx.showModal({
            title: '错误',
            content: jsonData.message,
          })
        }
      },
      fail: (e) => {
        wx.showModal({
          title: '错误',
          content: e,
        })
      }
    })
  },
  bindValueInput: function(e){
    this.setData({
      value: e.detail.value
    })
  },
  bindMessageInput: function(e){
    this.setData({
      message: e.detail.value
    })
  }
})