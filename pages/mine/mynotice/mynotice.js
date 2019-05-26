const App = getApp()
var that;
var common = require('utils/getCode.js');
var Bmob = require("utils/bmob.js");
var util = require('utils/util.js');

Page({
  data: {
    noticeList:[],
    noticeCount:0,
  },

  //-----------------------删除通知--------------------------------
  deletePlyre: function (e) {
    var id = e.currentTarget.dataset.id; //消息通知的id
    var Plyre = Bmob.Object.extend("Plyre");
    var plyre = new Bmob.Query(Plyre);
    plyre.get(id, {
      success: function (result) {
        result.destroy({
          success: function (myObject) {
            common.dataLoading("删除成功", "success");
            that.onShow();
          },
          error: function (myObject, error) {
            console.log(error);
          }
        })
      },
      error: function (result, error) {
        console.log(error);
      }
    })
  },

  //-----------滑动删除通知---------------------------
  touchSNotice: function (e) {  // touchstart
    let startX = App.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchMNotice: function (e) {  // touchmove
    let noticeList = App.Touches.touchM(e, this.data.noticeList, this.data.startX)
    noticeList && this.setData({ noticeList })
  },
  touchENotice: function (e) {  // touchend
    const width = 150  // 定义操作列表宽度
    let noticeList = App.Touches.touchE(e, this.data.noticeList, this.data.startX, width)
    noticeList && this.setData({ noticeList })
  },
  noticeDelete: function (e) {  // itemDelete
    let noticeList = App.Touches.deleteItem(e, this.data.noticeList)
    noticeList && this.setData({ noticeList })
    this.deletePlyre(e);
  },

  //-----------点击阅读详情----------------------
  readDetail: function (event) {
    var id = event.currentTarget.dataset.id; //消息的id
    var Plyre = Bmob.Object.extend("Plyre");
    var plyre = new Bmob.Query(Plyre);
    plyre.get(id, {
      success: function (result) {
        result.set("is_read", 1);
        result.save();
      },
      error: function (result, error) {
        console.log(error);
      }
    })
    wx.navigateTo({
      url: ''
    })
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {
    var user_id = wx.getStorageSync('user_id')
    var me = new Bmob.User();
    me.id = user_id;
    //**********查询未读消息****************************************** */
    //先查询未读消息有多少条
    var Diary = Bmob.Object.extend("Plyre");
    var query = new Bmob.Query(Diary);
    query.equalTo("is_read", 0);
    query.equalTo("fid", user_id);
    query.count({
      success: function (count) {
        that.setData({
          noticeCount: count
        });
      },
      error: function (error) {
      }
    });
    //再查询全部消息，包括已读
    var Plyre = Bmob.Object.extend("Plyre");
    var plyre = new Bmob.Query(Plyre);
    plyre.equalTo("fid", user_id);
    plyre.limit(50);
    plyre.descending("createdAt"); //按照时间降序
    var noticeList = new Array();
    plyre.find({ //查询消息的详细信息，并返回显示
      success: function (result) {
        for (var i = 0; i < result.length; i++) {
          var id = result[i].id; //消息的id
          var is_read = result[i].get("is_read");
          if (is_read == 0) {
            var status = "未读";
          } else if (is_read == 1) {
            var status = "已读";
          }
          var username = result[i].get("username");
          var createdAt = result[i].createdAt;
          var pubtime = util.getDateDiff(createdAt);
          var jsonA;
          jsonA = {
            "id": id || '',
            "is_read": is_read,
            "status": status || '',
            "username": username || '',
            "time": pubtime || '',
            "message": message || '',
          }
          noticeList.push(jsonA);
        }
        that.setData({
          noticeList: noticeList
        })
      }
    })
  }
})
