const config = require('../../config.js')
Page({
	onLoad(){
		const code = '19850112'
		wx.request({
			url: config.nodeService.loginUrl,
			data: {code},
			header: {},
			method: 'POST',
			dataType: 'json',
			responseType: 'text',
			success: function(res) {
				console.log(res)
			},
			fail: function(res) {},
			complete: function(res) {},
		})
	}
})