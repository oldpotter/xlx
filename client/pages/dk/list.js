const config = require('../../config.js')
const util = require('../../utils/util.js')
const moment = require('../../plugins/moment.min.js')
Page({
	data: {
		list: undefined
	},

	onLoad() {
		try {
			const _this = this
			wx.showLoading({
				title: '请稍后',
			})
			util.handleUUID()
				.then(res => util.pRequest(`${config.service.getDKsUrl}?uuid=${res}`))
				.then(res => {
					// console.log(res)
					if (res.data.MESSAGE == 'SUCCESS') {
						let list = res.data.DAKA
						list
							.forEach(item => {
								item.displayctime = moment(item.ctime).format('YYYY年MM月DD日 HH:mm')
								item.displayduration = {
									hours: moment.duration(item.duration).hours(),
									minutes: moment.duration(item.duration).minutes(),
									seconds: moment.duration(item.duration).seconds(),
								}
							})
						_this.setData({ list })
						// console.log(_this.data.list)
						wx.hideLoading()
					}

				})
		}
		catch (err) {
			wx.hideLoading()
			console.error(err)
		}

	},

})