// pages/feedback/feedback.js
Page({

  data: {
    buttons: [{ id: 1, name: '发现Bug' }, { id: 2, name: '吐槽一下' }],
  },

  /**
 * 事件监听,实现单选效果
 * e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
 */
  radioButtonTap:function(e){
    var this_checked = e.currentTarget.dataset.id;
    for (let i = 0; i < this.data.buttons.length; i++) {
      if (this.data.buttons[i].id == this_checked) {
        //当前点击的位置为true即选中
        this.data.buttons[i].checked = true;
      }
      else {
        //其他的位置为false
        this.data.buttons[i].checked = false;
      }
    }
    this.setData({
      buttons: this.data.buttons,
    })
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