const config = require('../../config.js')
const app = getApp()
Page({
	data: {
		url: config.service.getDKsUrl,
		page:1,
		toReload:undefined,
	},

	onReady(){
		wx.setNavigationBarTitle({
			title: '打卡记录',
			success: function(res) {},
			fail: function(res) {},
			complete: function(res) {},
		})
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
			// title: '打卡分享',
			path: `/pages/share/share?id=${app.selectedDkId}&uuid=${wx.getStorageSync('uuid')}`
		}
	},
})
