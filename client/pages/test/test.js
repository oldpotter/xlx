const config = require('../../config.js')
const util = require('../../utils/util.js')
Page({

	data: {
		url: undefined
	},

	onShareAppMessage(messages) {
		console.log(this.data.url)
		const _this = this
		return {
			title: '打卡分享',
			imageUrl: _this.data.url
		}
	},

	onReady() {
		const _this = this
		util.pRequest(config.nodeService.getShareImageUrl, {}, 'POST')
			.then(res => {
				console.log(res)
				return res.data.path
			})
			.then(()=>{
				wx.downloadFile({
					url: `https://ys2wqql1.qcloud.la/pic.png`,
					header: {},
					success: function(res) {
						console.log('download:',res)
						_this.setData({
							url:res.tempFilePath
						})
					},
					fail: function(res) {
						console.error('download:',res)
					},
					complete: function(res) {},
				})
			})
	},

	onTap(){
		console.log('sss')
		wx.showShareMenu({
			withShareTicket: true,
			success: function(res) {},
			fail: function(res) {},
			complete: function(res) {},
		})
	}

	
	

})