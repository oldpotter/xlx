const config = require('../../config.js')
const app = getApp()
Page({
	data: {
		url: config.service.getDKsUrl,
		page:1,
		toReload:undefined,
	},

	onReady(){
		this.setData({
			toReload:true,
		})
	},

	onReachBottom() {
		this.setData({
			page: this.data.page + 1
		})
	},

	onReachBottom() {
		this.setData({
			page: this.data.page + 1
		})
	},


	onShareAppMessage(messages) {
		return {
			path: `/pages/share/share?id=${app.selectedDkId}&uuid=${wx.getStorageSync('uuid')}`
		}
	},
})
