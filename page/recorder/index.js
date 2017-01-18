// page/recorder/index.js
var util = require('../../util/util.js')

const SAVE_VOICE = "保存录音"

var playTimeInterval
var recordTimeInterval

Page({
  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00:00',
    formatedPlayTime: '00:00:00',
    saveVoice: SAVE_VOICE
  },
  startRecord: function() {
    this.setData({
      recording: true
    })

    var that = this
    recordTimeInterval = setInterval(function() {
      var recordTime = that.data.recordTime += 1
      that.setData({
        formatedRecordTime: util.formatTime(that.data.recordTime),
        recordTime: recordTime
      })
    }, 1000)

    wx.startRecord({
      success: function(res) {

        // @ tempFilePath: wxfile://    本地临时录音的路径 
        // @ errMsg:  startRecord : ok  应该是返回信息
        that.setData({
          hasRecord: true,
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.formatTime(that.data.playTime)
        })
      },
      complete: function() {
        that.setData({
          recording: false
        })
        clearInterval(recordTimeInterval)

      },
      fail: function(res) {
        wx.showToast({
          title: res.message,
          duration: 2000
        })
      }
    })
  },
  stopRecord: function() {
    wx.stopRecord()    
  },
  stopRecordUnexpectedly: function() {
    var that = this
    wx.stopRecord({
      success: function() {
        console.log('stop record success')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        })
      }
    })
  },
  playVoice: function() {
    var that = this
    playTimeInterval = setInterval(function() {
      var playTime = that.data.playTime + 1
      console.log('update playTime', playTime)
      that.setData({
        playing: true,
        formatedPlayTime: util.formatTime(playTime),
        playTime: playTime
      })
    }, 1000)
    console.log("this.data.tempFilePath:" + this.data.tempFilePath)
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: function() {
        clearInterval(playTimeInterval)
        var playTime = 0
        console.log('play voice finished')
        that.setData({
          playing: false,
          formatedPlayTime: util.formatTime(playTime),
          playTime: playTime
        })
      }
    })
  },
  pauseVoice: function() {
    clearInterval(playTimeInterval)
    wx.pauseVoice()
    this.setData({
      playing: false
    })
  },
  stopVoice: function() {
    clearInterval(playTimeInterval)
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0
    })
    wx.stopVoice()
  },
  saveVoice: function() {
      var that = this
        wx.saveFile({
          tempFilePath: this.data.tempFilePath,
          success: function(res) {
            // @ savedFilePath: wxfile://    本地临时录音的路径 
            // @ errMsg:  saveFile : ok  应该是返回信息
            wx.showModal({
              title: "保存成功",
              content: "文件路径是" + res.savedFilePath
            })
            
            that.setData({
              tempFilePath: res.savedFilePath,
            })

            console.log("that.data.tempFilePath:"+that.data.tempFilePath)

          }
        })
  },
  clear: function() {
    clearInterval(playTimeInterval)
    wx.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    })
  }
})