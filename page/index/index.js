//index.js
var formatDate = require('../../util/util.js').formatDate

Page({
  data: {
    nickName: '',
    file: [],
    message: ''
  },
  onReady: function (options) {
    let app = getApp()
    const nickName = app.userInfo.nickName
    this.setData({
      nickName: nickName,
      message: "Hello, " + nickName
    })
  },
  onShow: function (options) {
    this.getFileContent()
  },
  getFileContent: function () {
    var that = this
    wx.getSavedFileList({
      success: function (res) {
        // @ filePath
        // @ size
        // @ createTime       

        // 按照文件生成时间排序
        var arr = []
        res.fileList.map(function (item) {
          if ( arr.length === 0) {
            console.log(0)
            arr.push(item)
          } else {
            let index
            
            for (let i = 0; i < arr.length; i++) {
              if ( item.createTime < arr[i].createTime ) {
                index = i
                break
              }
              index = i + 1
            }
            arr.splice(index, 0, item)
          }
        })

        arr.map(function (item, i) {
          let str = 'file[' + i + ']'
          let data = {
            [str + '.filePath']: item.filePath,
            [str + '.size']: item.size,
            [str + '.createTime']: formatDate(item.createTime),
          }
          // console.log(data)
          that.setData(data)
        })
        // console.log(JSON.stringify(that.data.file))
      },
      fail: function (res) {
        wx.showToast({
          title: '获取缓存文件失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },
  clearFile: function (event) {
    //event.currentTarget.dataset.filepath
    var that = this
    wx.removeSavedFile({
      filePath: event.currentTarget.dataset.filepath,
      success: function () {
        wx.showModal({
          title: "删除成功",
          content: "文件路径：" + event.currentTarget.dataset.filepath,
          success: function () {
            let index = event.currentTarget.dataset.index
            that.data.file.splice(index, 1)
            that.setData({
              file: that.data.file
            })
          }
        })
      }
    })
  }
})