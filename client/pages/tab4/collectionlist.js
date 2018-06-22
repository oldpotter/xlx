const app = getApp()
const config = require('../../config.js')
const util = require('../../utils/util.js')
Page({
  data: {
    list: [],
    noAttachment: true,
  },

  onLoad() {
    // console.log(`app.colliections:${app.collections}`)

    const _this = this
    
    app.collections.forEach(id => {
      wx.showLoading({
        title: '请稍后...',
      })
      wx.request({
        url: `${config.service.getArticleUrl}?id=${id}&format=JSON`,
        success: function(res) {
					let list = _this.data.list
          list.push(res.data)
          _this.setData({
            list
          })
					// console.log(list)
          wx.hideLoading()
        },
        fail: function(res) {
          console.error('请求失败。。。')
        },
      })
    })
		
  },

  onClickArticleItem(event) {
		const index = event.currentTarget.dataset.index
		const articleId = this.data.list[index].id
    wx.navigateTo({
      url: `../article/article?articleId=${articleId}`,
    })
  },

})