const config = require('../../config.js')
const util = require('../../utils/util.js')
const app = getApp()
Page({
	data: {
		url: config.service.getDKsUrl,
		num: 10,
		page: 1,
	},
	onLoad() {

	},

	onReachBottom() {
		this.setData({
			page: this.data.page + 1
		})
	},

	onShareAppMessage(messages) {
		console.log('test page:index:', app.selectedDkIndex)
	},
})