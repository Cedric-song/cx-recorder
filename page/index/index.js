//index.js
var formatDate = require('../../util/util.js').formatDate

Page({
  data: {
    nickName: '',
    file: [],
    message: ''
  },
  onReady: function(options) {
    let app = getApp()
    const nickName = app.userInfo.nickName
    this.setData({
      nickName: nickName,
      message: "Hello, " + nickName
    })
  },
  onShow: function(options) {
    this.getFileContent()
  },
  getFileContent: function() {
    var that = this
    wx.getSavedFileList({
      success: function(res) {
        // @ filePath
        // @ size
        // @ createTime       
        
        // 按照文件生成时间排序
        var arr = []
        res.fileList.map(function(item){
          var index
          for(let i=0;i<arr.length;i++){
            index = i
            if( item.createTime < arr[i].createTime ){
              break
            }
          }
          arr.splice(index,0,item)
        })

        arr.map(function(item, i) {
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