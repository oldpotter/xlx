const moment = require('./plugins/moment.min.js')
const util = require('./utils/util.js')
const config = require('./config.js')
App({
	version: `v1.7.3`,

	onLaunch() {
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
							console.log(res)
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

	article: null,//显示的文章
	collections: null,//收藏的文章ids
	level: null,//字体大小标示值
	usingRing:undefined,
	screenWidth: undefined,
	screenHeight: undefined,
	
})