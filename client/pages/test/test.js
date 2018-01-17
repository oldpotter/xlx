const config = require('../../config.js')
const util = require('../../utils/util.js')
Page({
	onShow() {
		util.pGetUserInfo()
			.then(res => {
				let result
				if (res.errMsg == 'getUserInfo:ok') {
					result = res
				}
				util.handleUUID(result)
					.then(res => util.pRequest(`${config.service.getUserInfoUrl}?uuid=${res}`))
					.then(res => console.log(res))
			})



	}
})