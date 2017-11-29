const config = require('../../config')
Page({
	data: {
		content: undefined
	},

	onLoad(options) {
		const _this = this
		const id = options.id
		console.log(`${config.service.getArticleDetailUrl}?id=${id}`)
		wx.request({
			url: `${config.service.getArticleDetailUrl}?id=${id}`,
			success: function (res) {
				console.log('detail:', res.data.CONTENT)
				_this.setData({
					content: res.data.CONTENT
				})
			},
			fail: function (res) {
				console.error('fail')
			},
		})
	},
})