# Cropping
## 小程序码
![](/images/1.jpg)
## 组件介绍
微信小程序裁剪组件，支持前端裁剪和后端裁剪两种方式

1.前端裁剪：将裁剪框指定的区域，单独生成图片，获取裁剪图片的临时文件路径

2.后端裁剪：获取裁剪框相对于原图的像素坐标位置，将裁剪区域坐标以及原图临时文件路径，传到后端进行图片裁剪

## git地址
[https://gitee.com/gnliscream/image-cropper](https://gitee.com/gnliscream/image-cropper)

## 软件架构
使用微信小程序自定义组件开发

小程序自定义组件官网：[https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html)


## 使用说明

### 目录结构
![](/images/2.jpg)

### 使用步骤

#### 1.下载组件源代码，放入小程序里自己定义的组件文件夹（例如/component）

#### 2.创建图片裁剪界面（例如/pages/image）

#### 3.image.json引入image-cropper组件
```json
{
  "usingComponents": {
    "image-cropper":"/component/image-cropper/index"
  }
}
```

#### 4.image.wxss设置背景色为黑色
```css
page{
  background-color: black;
}

.white{
  color: #fff;
  font-size: 30rpx;
}

.black{
  color: #333333;
  font-size: 30rpx;
  margin-top:10rpx;
}
```

#### 5.image.wxml
添加image-cropper标签，如下
```html
<image-cropper id="my-cropper" src="{{src}}" aspectRatio="{{aspectRatio}}" isProportion="{{isProportion}}" quality="{{quality}}"></image-cropper>
```
可以在image-cropper标签内添加操作按钮，如下
```html
<!-- 裁剪框标签 -->
<image-cropper id="my-cropper" src="{{src}}" aspectRatio="{{aspectRatio}}" isProportion="{{isProportion}}" quality="{{quality}}">
  <!-- 操作按钮 -->
  <view style="position: absolute;bottom:30rpx;left:30rpx;">
    <view class="white">裁剪框宽高比值</view>
    <slider min="0.4" max="3" step="0.1" value="{{aspectRatio}}" show-value="true" style="width:400rpx" bindchange="btn1"></slider>
    <view class="white">裁剪图片质量</view>
    <slider min="0.1" max="1" step="0.1" value="{{quality}}" show-value="true" style="width:400rpx" bindchange="btn2"></slider>
    <view style="display:flex">
      <button class="black" bindtap="btn3">等比缩放</button>
      <button class="black" bindtap="btn4">自由缩放</button>
    </view>
    <button class="black" bindtap="btn5">获取裁切参数</button>
    <button class="black" bindtap="btn6">获取裁切图临时文件地址</button>
  </view>
</image-cropper>
```

#### 6.image.js
首先需要在onLoad方法中，设置裁剪标签属性
```js
// 裁切对象
var cropper
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 根据标签id，获取到image-cropper对象，存储在全局变量cropper中
    cropper = this.selectComponent("#my-cropper");

    // 设置标签属性
    this.setData({
      // 从图片选择界面传原图临时文件地址给src
      src: options.imagePath,
      // 设置裁剪框宽高比值为 1（宽:高=1:1=1）
      aspectRatio: 1,
      // 设置是否等比缩放
      isProportion: true,
      // 设置裁剪后的图片质量
      quality: 1
    })
  },
}）
```

然后添加按钮相应的绑定方法
```js
// 裁切对象
var cropper
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 根据标签id，获取到image-cropper对象，存储在全局变量cropper中
    cropper = this.selectComponent("#my-cropper");

    // 设置标签属性
    this.setData({
      src: options.imagePath,
      aspectRatio: 1,
      isProportion: true,
      quality: 1
    })
  },
  btn1(e){
    // 图片宽高比值
    this.setData({
      aspectRatio: e.detail.value.toFixed(1)
    })
  },
  btn2(e){
    // 图片质量
    this.setData({
      quality: e.detail.value.toFixed(1)
    })
  },
  btn3(){
    // 打开等比缩放
    this.setData({
      isProportion: true
    })
  },
  btn4(){
    // 关闭等比缩放
    this.setData({
      isProportion: false
    })
  },
  btn5(){
    // 调用image-cropper对象的getResults函数，获取裁剪参数
    cropper.getResults(res =>{
      console.log(res)
    })
  },
  btn6(){
    // 调用image-cropper对象的getImagePath函数，获取裁剪后图片的地址
    cropper.getImagePath(res =>{
      console.log(res)
    })
  }
})
```
### 组件文档
#### 标签属性
参数|类型|默认值|说明
-|-|-|-
src|String|-|图片路径
aspectRatio|Number|1|裁剪框宽高比值，范围 [0.4,3]
isProportion|Boolean|false|是否开启宽高等比缩放
quality|Number|1|前端裁剪的裁剪图片质量，范围 (0,1]

#### 标签对象函数
##### 1.获取裁剪结果参数
```
getResults(res=>{ })
```
获取到的res如下
```json
{
    "crop":{
        "width": 1000, //裁剪完成的图片宽
        "height": 1000, //裁剪完成的图片高
        "top": 100, //裁剪完成的图片左上角,到原图顶部的距离
        "left": 200 //裁剪完成的图片左上角,到原图左边的距离
    },
    "originalImageInfo":{
        "width": 1920, //原图宽
        "height": 1080, //原图高
        "path": "images/1.jpg", //原图路径
        "type": "jpeg", //原图类型
        "orientation": "up" //原图拍摄设备方向
    }
}
```
获取到的裁剪参数的对应关系图

![](/images/3.jpg)

获取到裁剪参数后，将原图以及裁剪参数传到后台进行裁剪

2.获取裁剪图片地址
```
getImagePath(res=>{ })
```
获取到的res如下
```json
{ "path" : "http://tmp/wxb172f5d66edf27aa.jpg" }
```