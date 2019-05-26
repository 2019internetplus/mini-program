//app.js
// entrance


App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    
    wx.checkSession({
      success() {

      },
      fail: () => {
        // 用户登录
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: 'https://api.xumengli.cn/user/v0.1/login',
                method: 'POST',
                data: {
                  code: res.code
                },
                success: (data) => {
                  wx.setStorage({
                    key: "token",
                    data: data.data.token
                  });
                }
              })
            }
          }
        })

      }
    })
    

    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync('nickName', res.userInfo.nickName);
              wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.authorize({ //微信授权
            scope: 'scope.userInfo',
            success(){
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  wx.setStorageSync('nickName', res.userInfo.nickName);
                  wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl);
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  //获取全局变量
  globalData: {
    userInfo: null
  }
})