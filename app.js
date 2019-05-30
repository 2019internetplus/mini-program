//app.js
// entrance


App({
  onLaunch: function () {


    //设置提交日期，以备后序请求
    if(!wx.getStorageSync('commit_time')){
      const date = new Date().getDate() - 1;
      wx.setStorageSync('commit_time', date);
    }


    

    
    

    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync('authorized', true);
              // 可以将 res 发送给后台解码出 unionId
              console.log("1")
              this.globalData.userInfo = res.userInfo
              console.log(res);
              wx.setStorageSync("nickName", res.userInfo.nickName);
              wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: err=>{
              console.log(err);
            }
          })
        }else{
          wx.setStorageSync('authorized', false);
        }
      },
      fail: err =>{
        console.log(err);
      }
    })
  },
  //获取全局变量
  globalData: {
    userInfo: null
  }
})

