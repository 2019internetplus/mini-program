var _app = getApp()
Page({
  data: { 
    menuitems: [
      { text: '我的报告', url: 'myreport/myreport', icon: '../../images/mine/myreport.png' },
      { text: '我的消息', url: 'mynews/mynews', icon: '../../images/mine/mynews.png'}, 
      { text: '使用帮助', url: 'usehelp/usehelp', icon: '../../images/mine/usehelp.png'},
      { text: '关于我们', url: 'aboutus/aboutus', icon: '../../images/mine/aboutus.png' }
    ]
  },
  onLoad: function (options) { 
  }
})