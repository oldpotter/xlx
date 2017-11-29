const app = getApp()
const config = require('../../config.js')

Page({
	data: {
		list: [],
		noAttachment: true,
	},

	onLoad() {
		console.log('collectios:', app.collections)
		const _this = this
		app.collections.forEach(id => {
			wx.showLoading({
				title: '请稍后...',
			})
			wx.request({
				url: `${config.service.getArticleUrl}?id=${id}&format=JSON`,
				success: function (res) {
					// console.log('收到数据：',res.data)
					// _this.data.list.push(res.data)
					let list = _this.data.list
					list.push(res.data)
					_this.setData({
						list: list
					})
					console.log('list:', _this.data.list)
					wx.hideLoading()
				},
				fail: function (res) {
					console.error('请求失败。。。')
				},
			})
		})

	},

	onClickArticleItem(event) {
		const articleId = app.collections[event.currentTarget.dataset.index]
		console.log('click:',articleId)
		wx.navigateTo({
			url: `../article/article?articleId=${articleId}`,
		})
	},

})