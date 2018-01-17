const config = require('../../config.js')
const util = require('../../utils/util.js')
const moment = require('../../plugins/moment.min.js')
Page({

	data: {
		content: undefined,
		displayduration: undefined,
		displaydata: undefined,
		userinfo: undefined
	},

	onLoad(options) {
		const _this = this
		util.pRequest(`${config.service.getUserInfoUrl}?uuid=${options.uuid}`)
			.then(res => {
				// console.log(res.data)
				if (res.data.MESSAGE == 'SUCCESS') {
					_this.setData({
						userinfo: res.data
					})
				}
				return util.pRequest(`${config.service.getSingalDKUrl}?id=${options.id}`)
			})
			.then(res => {
				if (res.data.MESSAGE == 'SUCCESS') {
					// console.log(res)
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
			})
	},

	onClickBtn(){
		console.log('onClickBtn')
		wx.switchTab({
			url: '../dk/dk',
			success: function(res) {},
			fail: function(res) {},
			complete: function(res) {},
		})
		
	},
})