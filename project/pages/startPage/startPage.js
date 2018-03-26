//获取应用实例
const app = getApp()
var common = require("../data/data.js")

Page({
  data: {
    is_show_all: app.globalData.is_show_all,
    page_content:null
  },
  switchChange: function (e) {
    if (e.detail.value==0)
    {
      this.setData({
        is_show_all: false
      });
      app.globalData.is_show_all=false;
      this.show_page();
    }
    else
    {
      this.setData({
        is_show_all: true
      });
      app.globalData.is_show_all = true;
      this.show_page();
    }
  },
  checkboxChange: function (e) {
    var items = app.globalData.local_content, values = e.detail.value;
    for (var i = 0;i < values.length; i++) {
      console.log('i:' + i + ',check:', values[i])
    }
  },
  showStorage: function () {
    console.log('本地数组长度:'+app.globalData.local_content.length)
  },
  refresh:function(){
    var content = wx.getStorageSync('content') || []
    if (content == null || content == [] || content.length == 0) {
      // console.log('本地数据为空')
      app.globalData.local_content = common.content;
      wx.setStorageSync('content', common.content)
    }
    else {
      console.log('本地数据:' + content.length)
      var needContent = []
      //先从配置文件中取出数据，如果配置文件中有，但是Local没有，就写到Local中
      for (var i = 0; i < common.content.length; i++) {
        // console.log('本地数据:' + common.content[i]+',i:'+i);
        var item = common.content[i];
        var contain = false;
        for (var j = 0; j < content.length; j++) {
          var local_item = content[j];
          if (local_item.key == item.key) {
            contain = true;
            break;
          }
        }
        if (contain) {
          //do nothing?
        }
        else {
          needContent.push(item)
        }
      }
      if (needContent.length > 0) {
        content = content.concat(needContent);
      }
      app.globalData.local_content = content;
      wx.setStorageSync('content', content)
    }
  },
  show_page: function(){
    if (app.globalData.is_show_all)
    {
      this.setData({
        content: app.globalData.local_content
      });
    }
    else
    {
      var tmpContent=[];
      for (var i = 0; i < app.globalData.local_content.length; i++) 
      {
        var item = app.globalData.local_content[i];
        if(item.status==0)
        {
          tmpContent.push(item);
        }
      }
      this.setData({
        content: tmpContent
      });
    }

  },
  onLoad: function (options) {
    var is_show_all = app.globalData.is_show_all;
    this.refresh();
    this.show_page();
    // console.log(app.globalData.content)
    // page_data = app.globalData.content
  }
})