const config = require('../../config.js')
const moment = require('../../plugins/moment.min.js')
Page({

	data: {
		content: undefined,
		displayduration: undefined,
		displaydata:undefined,
	},

	onLoad(options) {
		const _this = this
		wx.request({
			url: `${config.service.getSingalDKUrl}?id=${options.id}`,
			success: function (res) {
				if (res.data.MESSAGE == 'SUCCESS') {
					console.log(res)

					_this.setData({
						content: res.data.record,
						displayduration: {
							hours: moment.duration(res.data.duration).hours(),
							minutes: moment.duration(res.data.duration).minutes(),
							seconds: moment.duration(res.data.duration).seconds(),
						},
						displaydata: moment(res.data.ctime).format('YYYY年MM月DD日 HH:mm')
					})
				}
			},
			fail: function (res) {
				console.error(res)
			},
			complete: function (res) { },
		})
	},
})