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
			this.handleUUID()
				.then(res => util.pRequest(`${config.service.getDKsUrl}?uuid=${res}`))
				.then(res => {
					if (res.data.MESSAGE == 'SUCCESS') {
						let list = res.data.DAKA
						list.reverse()
							.forEach(item => {
								item.displayctime = moment(item.ctime).format('YYYY年MM月DD日')
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

	handleUUID() {
		return new Promise((resolve, reject) => {
			// let uuid = wx.getStorageSync('uuid')
			let uuid
			if (uuid) {
				resolve(uuid)
			} else {
				wx.login({
					success: function (res) {
						util.pRequest(`${config.service.loginUrl}?jsCode=${res.code}`)
							.then(res => {
								if (res.data.MESSAGE == 'SUCCESS') {
									uuid = res.data.UUID
									wx.setStorageSync('uuid', uuid)
									resolve(uuid)
								}
							})
					},
					fail: function (res) {
						reject('wx.login失败')
					},
					complete: function (res) { },
				})
			}
		})
	},


})