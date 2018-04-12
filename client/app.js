const moment = require('./plugins/moment.min.js')
const util = require('./utils/util.js')
const config = require('./config.js')
App({
	version: `v1.7.3`,

	onLaunch() {
		if (wx.canIUse('getUpdateManager')) {
			// wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
			const updateManager = wx.getUpdateManager()

			updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate)
			})

			updateManager.onUpdateReady(function () {
				wx.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否马上重启小程序？',
					success: function (res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate()
						}
					}
				})
			})

			updateManager.onUpdateFailed(function () {
				// 新的版本下载失败
			})
		}

		moment.locale('zh', {
			relativeTime: {
				past: "%s前",
			}
		});
		this.collections = wx.getStorageSync('collections') || []
		this.level = wx.getStorageSync('level') || 25
		this.usingRing = wx.getStorageSync('useingRing')
		Promise.prototype.finally = function (callback) {
			let P = this.constructor;
			return this.then(
				value => P.resolve(callback()).then(() => value),
				reason => P.resolve(callback()).then(() => { throw reason })
			);
		}

		this.screenWidth = wx.getSystemInfoSync().screenWidth
		this.screenHeight = wx.getSystemInfoSync().screenHeight
	},
	/*
	onShow(){
		wx.login({
			success: function(res) {
				if(res.errMsg==='login:ok'){
					wx.request({
						url: config.nodeService.loginUrl,
						data: {code:res.code},
						header: {},
						method: 'POST',
						dataType: 'json',
						responseType: 'text',
						success: function(res) {
							// console.log(res)
						},
						fail: function(res) {},
						complete: function(res) {},
					})
				}
			},
			fail: function(res) {},
			complete: function(res) {},
		})
	},
	*/

	article: null,//显示的文章
	collections: null,//收藏的文章ids
	level: null,//字体大小标示值
	usingRing: undefined,
	screenWidth: undefined,
	screenHeight: undefined,

})