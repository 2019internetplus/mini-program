var _app = getApp()
var common = require("../common.js")
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

  toLogin: function () {
    common.onLogin();
    common.getUserInfo();
    common.userInfoSetInSQL(userInfo);
  },
  onLoad: function (options) { 
  }
})