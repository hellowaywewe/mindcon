// index.js
Page({
  data: {
    userID: '',
    options: [{
      city_id: 'Wuhan',
      city_name: '武汉'
    }, {
      city_id: 'Nanjing',
      city_name: '南京'
    }, {
      city_id: 'Tianjin',
      city_name: '天津'
    }, {
      city_id: 'Changsha',
      city_name: '长沙'
    }, {
      city_id: 'Guilin',
      city_name: '桂林'
    }, {
      city_id: 'Suzhou',
      city_name: '苏州'
    }, {
      city_id: 'Shandong',
      city_name: '山东'
    }, {
      city_id: 'Beijing',
      city_name: '北京'
    }, {
      city_id: 'Zhengzhou',
      city_name: '郑州'
    }, {
      city_id: 'Ningbo',
      city_name: '宁波'
    }, {
      city_id: 'Chongqing',
      city_name: '重庆'
    }, {
      city_id: 'Hangzhou',
      city_name: '杭州'
    }, {
      city_id: 'Guangzhou',
      city_name: '广州'
    }, {
      city_id: 'Shenzhen',
      city_name: '深圳'
    }, {
      city_id: 'Shanghai',
      city_name: '上海'
    }],
    selected: {},
    imageUrl:""
  },
  change (e) {
    this.setData({
      selected: { ...e.detail }
    })
    wx.showToast({
      title: `${this.data.selected.id} \n ${this.data.selected.name}`,
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
    let imageUrl = "https://mindcon.obs.cn-north-4.myhuaweicloud.com/" + `${this.data.selected.id}` + "/" + this.data.userID + ".jpg"
    wx.request({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer',
      success: function (res) {
        if (res.statusCode === 404){
          wx.showToast({
            title: `徽章不存在，确认所属城市及Github/Gitee的ID！`,
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
      url: "https://mindcon.obs.cn-north-4.myhuaweicloud.com/" + `${this.data.selected.id}` + "/" + this.data.userID + ".jpg",//图片的地址
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
  } 
})