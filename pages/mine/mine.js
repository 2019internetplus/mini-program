var _app = getApp()
Page({
  data: { 
    menuitems: [
      { text: '我的会员', url: '../mymember/mymember', icon: '../../images/会员.png', tips: '' }, 
      { text: '我的测评', url: '../myassessment/myassessment', icon: '../../images/测评.png', tips: '' }, 
      { text: '我的收藏', url: '../mycollection/mycollection', icon: '../../images/收藏.png', tips: '' },
      { text: '我的消息', url: '../mynews/mynews', icon: '../../images/消息.png', tips: '' }, 
      { text: '我的购买', url: '../mypurchase/mypurchase', icon: '../../images/购买.png', tips: '' }
    ]
  },
  onLoad: function (options) { 
  }
})