var _app = getApp()
Page({
  data: { 
    menuitems: [
      { text: '我的报告', url: '../myreport/myreport', icon: '../../images/mine/我的报告.png' },
      { text: '我的消息', url: '../mynews/mynews', icon: '../../images/mine/我的消息.png'}, 
      { text: '使用帮助', url: '../usehelp/usehelp', icon: '../../images/mine/使用帮助.png'},
      { text: '关于我们', url: '../aboutus/aboutus', icon: '../../images/mine/关于我们.png' }
    ]
  },
  onLoad: function (options) { 
  }
})