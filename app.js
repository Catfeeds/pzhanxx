import {
  Token
} from "/utils/token.js"

var token = new Token
var App = require('./utils/xmadx_sdk.min.js').xmad(App, 'App').xmApp;
App({
  onLaunch: function() {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.setStorageSync('authorize_status', true)

          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userInfo', res.userInfo)
              wx.setStorageSync('userInfoRes', res)
              token.saveUserInfo(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },

  // onHide: function() {
  //   this.globalData.socials = []
  // },

  globalData: {
    userInfo: null,
    socials: [],
    mySocials: [],
    comments: [],
    socialIsLoadMode: true,
    mySocialIsLoadMode: true,
    pictures: [],
    like_ids: [],
    collect_ids: [],
    special_comments: [],
    newTab: 1
  }
})
