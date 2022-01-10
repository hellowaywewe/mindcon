// index.js
Page({
  data: {
    userID: '',
    options: [{
      sig_id: 'Day1',
      sig_name: 'MindSpore SIG总览'
    }, {
      sig_id: 'Day2',
      sig_name: 'AI Security'
    }, {
      sig_id: 'Day3',
      sig_name: 'FrontEnd&Data'
    }, {
      sig_id: 'Day4',
      sig_name: 'DevelopereXperience'
    }, {
      sig_id: 'Day5',
      sig_name: 'Parallel'
    }, {
      sig_id: 'Day6',
      sig_name: 'Visualization'
    }, {
      sig_id: 'Day7',
      sig_name: 'MSLITE'
    }, {
      sig_id: 'Day8',
      sig_name: '算子组'
    }],
    selected: {},
    imageUrl:""
  },
  change (e) {
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.name}`,
      icon: 'none',
      duration: 1000
    })
  },
  close () {
    // 关闭select
    this.selectComponent('#select').close()
  },
  input_user (e){
    this.setData({
      userID: e.detail.value
    })
  },
  show (e){
    var that = this;
    let imageUrl = "https://mindcon.obs.cn-north-4.myhuaweicloud.com/mindcon3/" + `${this.data.selected.id}` + "/" + this.data.userID + ".jpg"
    wx.request({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
      success: function (res) {
        if (res.statusCode === 404){
          wx.showToast({
            title: `徽章不存在，确认点亮SIG组会议及B站账号！`,
            icon: "none"
          }),
          that.setData({
            imageUrl: ""
          })
        } else{
          let imageUrl ='data:image/png;base64,' + wx.arrayBufferToBase64(res.data);
          that.setData({    
            imageUrl: imageUrl
          })
        }      
      },
      fail: function (res){
        wx.showToast({
          title: `服务器出错！`,
          icon: "error"
        })
      }
    })
  },
  download: function(e) {
    wx.downloadFile({
      url: "https://mindcon.obs.cn-north-4.myhuaweicloud.com/mindcon3/" + `${this.data.selected.id}` + "/" + this.data.userID + ".jpg",//图片的地址
      type: "image",
      success:function(res){
        const tempFilePath = res.tempFilePath  //如果请求成功，则通过res中的tempFilePath 得到需要下载的图片地址
        if(tempFilePath.substring(tempFilePath.lastIndexOf('.') + 1) != 'jpg'){
          wx.showToast({
            title: `徽章不存在!`,
            icon: 'error'
          })
          return;
        }
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,  //设置下载图片的地址
          success:function(){
            wx.showToast({
              title: `徽章保存成功!`,
              icon: 'success'
            })
          },
          fail:function(){
            wx.showToast({
              title: `徽章保存失败!`,
              icon: 'error'
            })
          }
        })
      }
    })
  },
  all_show (e){
    var that = this;
    let imageUrl = "https://mindcon.obs.cn-north-4.myhuaweicloud.com/mindcon3/" + "All" + "/" + this.data.userID + ".jpg"
    wx.request({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
      success: function (res) {
        if (res.statusCode === 404){
          wx.showToast({
            title: `未集齐完整拼图，请确认您的B站账号！`,
            icon: "none"
          }),
          that.setData({
            imageUrl: ""
          })
        } else{
          let imageUrl ='data:image/png;base64,' + wx.arrayBufferToBase64(res.data);
          that.setData({    
            imageUrl: imageUrl
          })
        }      
      },
      fail: function (res){
        wx.showToast({
          title: `服务器出错！`,
          icon: "error"
        })
      }
    })
  },
  all_download: function(e) {
    wx.downloadFile({
      url: "https://mindcon.obs.cn-north-4.myhuaweicloud.com/mindcon3/" + "All" + "/" + this.data.userID + ".jpg",//图片的地址
      type: "image",
      success:function(res){
        const tempFilePath = res.tempFilePath  //如果请求成功，则通过res中的tempFilePath 得到需要下载的图片地址
        if(tempFilePath.substring(tempFilePath.lastIndexOf('.') + 1) != 'jpg'){
          wx.showToast({
            title: `未集齐完整拼图!`,
            icon: 'error'
          })
          return;
        }
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,  //设置下载图片的地址
          success:function(){
            wx.showToast({
              title: `完整拼图保存成功!`,
              icon: 'success'
            })
          },
          fail:function(){
            wx.showToast({
              title: `完整拼图保存失败!`,
              icon: 'error'
            })
          }
        })
      }
    })
  }
})