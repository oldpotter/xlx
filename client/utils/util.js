const moment = require('../plugins/moment.min.js')
const config = require('../config.js')
const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const getTimeFromNow = timestamp => {
	return moment(timestamp).fromNow()
}

const getFormatTime = timestamp => {
	return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 网络请求
 */
function pRequest(url, data, method = 'GET', header = {}, dataType = 'json') {
	return new Promise((resolve, reject) => {
		wx.request({
			url: url,
			data: data,
			header: header,
			method: method,
			dataType: dataType,
			success: function (res) {
				resolve(res)
			},
			fail: function (res) {
				reject(res)
			},
		})
	})
}

function handleUUID() {
	const _this = this
	return new Promise((resolve, reject) => {
		let uuid = wx.getStorageSync('uuid')
		// let uuid
		if (uuid) {
			resolve(uuid)
		} else {
			wx.login({
				success: function (res) {
					_this.pRequest(`${config.service.loginUrl}?jsCode=${res.code}`)
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
}

module.exports = {
	formatTime,
	getTimeFromNow,
	getFormatTime,
	pRequest,
	handleUUID
}
