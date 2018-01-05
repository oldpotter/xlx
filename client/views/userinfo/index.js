const qcloud = require('../../plugins/wafer2-client-sdk/index')
const app = getApp()
module.exports = {
	
	login(){
		const _this = this
		wx.showLoading({
			title: '请稍后',
		})
		qcloud.login({
			success(userInfo) {
				console.log('获取userInfo成功:', userInfo)
				_this.setData({
					userInfo: userInfo
				})
				wx.hideLoading()
			},
			fail(err) {
				console.error('获取userinfo失败:',err)
				wx.hideLoading()
			}
		})
	},

	onClickOpenSettingBtn() {
		wx.openSetting({
		})
	}
}