var _app = getApp()



Page({
  data: { 
    userinfo:{
      nickName: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('avatarUrl')
    },
    menuitems: [
      { text: '我的报告', url: 'myreport/myreport', icon: '../../images/mine/myreport.png' },
      { text: '我的消息', url: 'mynotice/mynotice', icon: '../../images/mine/mynotice.png'}, 
      { text: '使用帮助', url: 'usehelp/usehelp', icon: '../../images/mine/usehelp.png'},
      { text: '关于我们', url: 'aboutus/aboutus', icon: '../../images/mine/aboutus.png' }
    ]
  },

  bindGetUserInfo: function(e){
    if(e.detail.userInfo){
      console.log(e);
      wx.setStorageSync('nickName', e.detail.userInfo.nickName);
      wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
    }else{
      wx.showModal({
        title: '警告',
        content: '你拒绝授权，一些功能将无法使用',
        showCancel: false,
        confirmText: '返回授权',
      });
    }
  },
  onLoad: function (options) { 
  }
})