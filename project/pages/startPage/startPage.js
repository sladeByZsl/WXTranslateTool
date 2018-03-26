//获取应用实例
const app = getApp()
var common = require("../data/data.js")

Page({
  data: {
    
  },
  onLoad: function (options) {
    var content = wx.getStorageSync('content') || []
    if(content==null || content==[]||content.length==0)
    {
      console.log('本地数据为空')
      wx.setStorageSync('content', common.content)
    }
    else
    {
      console.log('本地数据:'+content.length)
      var needContent=[]
      //1.先从配置文件中取出数据，如果配置文件中有，但是Local没有，就写到Local中
      for (var i = 0; i < common.content.length;i++)
      {
        var item=content[i];
        var contain=false;
        for (var j = 0; j < content.length; j++)
        {
          var local_item=content[j];
          if(local_item.key==item.key)
          {
              contain=true;
              break;
          }
        }
        if(contain)
        {
            //do nothing?
        }
        else
        {
            needContent
        }
      } 
    }

    this.setData({
      content:common.content
    });
    // console.log(app.globalData.content)
    // page_data = app.globalData.content
  }
})