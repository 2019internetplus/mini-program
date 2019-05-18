var _app = getApp()
Page({
  data: { 
    menuitems: [
      { text: '我的报告', url: '../myreport/myreport', icon: '../../images/我的报告.png' },
      { text: '我的消息', url: '../mynews/mynews', icon: '../../images/我的消息.png'}, 
      { text: '使用帮助', url: '../usehelp/usehelp', icon: '../../images/使用帮助.png'},
      { text: '关于我们', url: '../aboutus/aboutus', icon: '../../images/关于我们.png' }
    ]
  },
  onLoad: function (options) { 
  }
})