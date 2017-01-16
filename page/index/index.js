//index.js
Page({
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // debugger
    wx.getSavedFileInfo({
      filePath: 'wxfile://somefile', //仅做示例用，非真正的文件路径
          success: function(res) {
            // debugger
            console.log(res.size)
            console.log(res.createTime)
          },
          fail: function(msg){
            // debugger
          }
        })
  },
})
