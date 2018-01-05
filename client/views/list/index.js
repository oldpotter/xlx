//list
const util = require('../../utils/util.js')
const app = getApp()
module.exports = {
	data: {
		url:null,
		page: 1,
		list: [],
		noMoreData: false,
		isLoading: false, 
	},

	setOptions(options){
		this.setData(options)
	},

	requestData() {
		wx.showLoading({
			title: '请稍后...',
		})
		this.setData({
			isLoading: true
		})
		const _this = this
		wx.request({
			url: `${_this.data.url}&page=${_this.data.page}`,
			success: function (res) {
				const data = res.data.HITS
				if (data.length > 0) {
					_this.setData({
						list: _this.data.list.concat(data.map(item => {
							item.ctimeFormat = util.getTimeFromNow(item.ctime)
							item.replaytimeFormat = util.getFormatTime(item.replaytime)
							return item
						}))
					})
					console.log('data.list:',_this.data.list)
					_this.setData({
						noMoreData: false
					})
				} else {
					_this.setData({
						noMoreData: true
					})
				}
				wx.hideLoading()
				_this.setData({
					isLoading: false
				})
			},
			fail: function (res) {
				console.error('发起请求失败。。。')
			},
			complete: function (res) { },
		})
	},

	onReachBottom() {
		if (!this.data.url) {
			return
		}
		this.setData({
			page: ++this.data.page
		})
		this.requestData()
	},

	onClickArticleItem(event){
		const index = event.currentTarget.dataset.index
		app.article = this.data.list[index]
		wx.navigateTo({
			url: `../article/article?showAttachment=true`,
		})
	}
}