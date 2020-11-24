// 裁切对象
var cropper
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否显示裁剪
    isShowCrop:false,
    // 裁剪的完成图片
    cropOkImg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showCro() {
    let that=this;
    // 图片上传
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 上传成功后跳转 裁剪
        let src = res.tempFilePaths[0];
        // 设置标签属性
        that.setData({
          // 从图片选择界面传原图临时文件地址给src
          src:src,
          // 设置裁剪框宽高比值为 1（宽:高=1:1=1）
          aspectRatio:(400/660).toFixed(4),
          // 设置是否等比缩放
          isProportion: true,
          // 设置裁剪后的图片质量
          quality: 1,
          // 是否显示裁剪
          isShowCrop:true
        });
        // 根据标签id，获取到image-cropper对象，存储在全局变量cropper中
        cropper = that.selectComponent("#my-cropper");
      }
    })
  },

  btn1(e) {
    console.log("改变图片宽高比",e)
    // 图片宽高比值
    this.setData({
      aspectRatio: e.detail.value.toFixed(1)
    })
  },
  btn2(e) {
    // 图片质量
    this.setData({
      quality: e.detail.value.toFixed(1)
    })
  },
  btn3() {
    // 打开等比缩放
    this.setData({
      isProportion: true
    })
  },
  btn4() {
    // 关闭等比缩放
    this.setData({
      isProportion: false
    })
  },
  btn5() {
    // 调用image-cropper对象的getResults函数，获取裁剪参数
    cropper.getResults(res => {
      console.log(res)
    })
  },
  btn6() {
    let that=this;
    // 调用image-cropper对象的getImagePath函数，获取裁剪后图片的地址
    cropper.getImagePath(res => {
      console.log(res)
      that.setData({
        isShowCrop:false,
        cropOkImg:res.path
      });
    })
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