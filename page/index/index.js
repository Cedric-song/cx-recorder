//index.js
var formatDate = require('../../util/util.js').formatDate

Page({
  data: {
    nickName: '',
    file: [],
    message: ''
  },
  onShow: function(options) {
    let app = getApp()
    const nickName = app.userInfo.nickName
    this.setData({
      nickName: nickName,
      message: "Hello, " + nickName
    })

    this.getFileContent()
  },
  getFileContent: function() {
    var that = this
    wx.getSavedFileList({
      success: function(res) {
        // @ filePath
        // @ size
        // @ createTime        

        res.fileList.map(function(item, i) {
          let str = 'file[' + i + ']'
          let filePath = str + '.filePath'
          let size = str + '.size'
          let createTime = str + '.createTime'
          let data = {
            [filePath]: item.filePath,
            [size]: item.size,
            [createTime]: formatDate(item.createTime),
          }
          // console.log(data)
          that.setData(data)
        })
        // console.log(JSON.stringify(that.data.file))
      },
      fail: function(res) {
        wx.showToast({
          title: '获取缓存文件失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  }
})