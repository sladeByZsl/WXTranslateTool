//获取应用实例
const app = getApp()
var key;
var common = require("../data/data.js")

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    count:1
  },

  bindKeyInput: function (e) {
    for (var index = 0; index < app.globalData.local_content.length; index++) {
      var tmp_item = app.globalData.local_content[index];
      if (tmp_item.key == key) {
        tmp_item.count = (Number)(e.detail.value);
        wx.setStorageSync('content', app.globalData.local_content);
        break;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    key=options.id;
    console.log('key:'+key)
    for (var index = 0; index < app.globalData.local_content.length;index++)
    {
      var tmp_item = app.globalData.local_content[index];
        // console.log('tmp:'+tmp_item.key)
        // console.log('item:' + key)
        if (tmp_item.key == key)
        {  
          // tmp_item.count+=1;
          console.log('item:' + tmp_item.status)
          this.setData({
            item: tmp_item,
            count: tmp_item.count
          })
        }
    }
  },

  switchChange: function (e) {
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
    for (var index = 0; index < app.globalData.local_content.length; index++) 
    {
      var tmp_item = app.globalData.local_content[index];
      if (tmp_item.key == key) 
      {
        if (e.detail.value)
        {
          tmp_item.status=1;
        }
        else
        {
          tmp_item.status = 0;
        }
        wx.setStorageSync('content', app.globalData.local_content);
        break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})